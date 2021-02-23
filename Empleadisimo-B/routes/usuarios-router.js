const express = require('express');
const router = express.Router();
var usuario = require('../models/usuarios');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')


//login user
router.post("/signin", async (req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const user = await usuario.findOne({'correo':correo})

    if(user==null){
        return res.status(401).json({"message":"No se encontró ningún usuario registrado con ese correo electrónico"});
    }

    var resultado = bcrypt.compareSync(password, user.password);
    if(!resultado){
        return res.status(401).json({"message":'Contraseña incorrecta'});
    }
    
    const token = jwt.sign({_id: user._id}, 'secretkey');
    return res.status(200).json({token, 'idUser':user._id, 'tipo':user.tipoUsuario});
});

//Crear un usuario simple
router.post('/', async function(req, res){
    const correo = req.body.correo;
    const hash = await bcrypt.hashSync(req.body.password, 10)   
    const user = await usuario.findOne({'correo':correo});
    console.log(user);
    if (user!=null) {
        return res.status(401).json({"message":"correo en uso"});
    }
    
    let userRouter = new usuario({
        nombreCompleto:'',
        correo: req.body.correo,
        password: hash,
        profesion: [],
        tipoUsuario: req.body.tipoUsuario,              //Usuario: 0, Empresa: 1, Administrador: 2
        fechaNacimiento: null,
        genero: 1,                        //Masculino: 1, Femenino: 0
        rating: [],                                   //{pais: '', departamento: '', ciudad: ''}
        curriculums: [],                                   //[{idCV: '', nombreCV: '', fechaCreacion: ''}]    
        fotoPerfil: '',
        medioPago: [],
        sucursales: [],
        rubros: [],
        fechaFundacion: null
    });

    userRouter.save().then(result => {
        const token = jwt.sign({_id: userRouter._id}, 'secretkey');
        res.status(200).json({token, 'idUser':userRouter._id,'tipo':userRouter.tipoUsuario});
        res.end();
        

    }).catch(error => {
        res.send(error);
        res.end();
    });
});


//Obtener un usuario
router.get('/:idUser', verifyToken, function(req, res){
    usuario.find({_id:  req.params.idUser})
    .then(result =>{
        res.send(result);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    });
});

//Obtener todos los usuarios -- solo se obtiene el correo del usuario
router.get('/',function(req,res){
    usuario.find({

    },{
        correo:1
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Actualizar usuario empleado

router.put('/updateEmployee/:idUser', async (req, res) =>{
    await usuario.updateOne({
        _id: req.params.idUser
    }, {
        "nombreCompleto": req.body.nombreCompleto,
        "correo": req.body.correo,
        "profesion": req.body.profesion,
        "fechaNacimiento": req.body.fechaNacimiento,
        "genero": req.body.genero,
        "curriculums": req.body.curriculums,
        "fotoPerfil":req.body.urlFotoPerfil,
        "medioPago": req.body.medioPago
    })
    .then(result => {
        res.status(200).json({'message': 'Datos actualizados correctamente'});
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});


//Actualizar usuario empresa

router.post('/updateCompany/:idUser', async (req, res) =>{
    await usuario.updateOne({
        _id: req.params.idUser
    }, {
        "nombreCompleto": req.body.nombreCompleto,
        "correo": req.body.correo,
        "fotoPerfil":req.body.urlFotoPerfil,
        "sucursales": req.body.sucursales,
        "rubros": req.body.rubros,
        "fechaFundacion":req.body.fechaFundacion
    })
    .then(result => {
        res.status(200).json({'message': 'Datos actualizados correctamente'});
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

//Actualizar solo contraseña

router.post('/updatePassword/:idUser', async (req, res) => {
    const hash = await bcrypt.hashSync(req.body.newPassword, 10)
    const user = await usuario.findOne({'_id':req.params.idUser})

    if(!bcrypt.compareSync(req.body.oldPassword, user.password)){
        return res.status(401).json({"message":'La contraseña anterior no coincide.'});
    }
    
    usuario.updateOne(
        {_id:req.params.idUser},
        {
            password: hash
        })
        .then( () => {
            res.status(200).json({'message': 'Datos actualizados correctamente'});
            res.end()
        }).catch(error => {
            res.send(error);
            res.end();
        })
    
})

//Eliminar un usuario
router.delete('/:id', function(req,res){
    usuario.remove(
        {
            _id: req.params.id
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

module.exports = router;

function verifyToken(req, res, next){
    if(!req.headers.authorization){
    }

    const token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey')
    console.log(payload);
    req.userId = payload._id;
    next();
}