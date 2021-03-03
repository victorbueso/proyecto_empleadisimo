const express = require('express');
const router = express.Router();
var usuario = require('../models/usuarios');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');
const uuid = require("uuid");
const Mongoose = require('mongoose');


//login user
router.post("/signin", async(req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const user = await usuario.findOne({ 'correo': correo })
    if (user == null) {
        return res.status(401).json({ "message": "No se encontró ningún usuario registrado con ese correo electrónico" });
    }

    var resultado = bcrypt.compareSync(password, user.password);
    if (!resultado) {
        return res.status(401).json({ "message": 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token, 'idUser': user._id, 'tipo': user.tipoUsuario });
});

//Crear un usuario simple
router.post('/', async function(req, res) {
    const correo = req.body.correo;
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const user = await usuario.findOne({ 'correo': correo });
    console.log(user);
    if (user != null) {
        return res.status(401).json({ "message": "correo en uso" });
    }

    let userRouter = new usuario({
        nombreCompleto: '',
        correo: req.body.correo,
        password: hash,
        profesion: [],
        tipoUsuario: req.body.tipoUsuario, //Usuario: 0, Empresa: 1, Administrador: 2
        fechaNacimiento: null,
        genero: 1, //Masculino: 1, Femenino: 0
        rating: [], //{pais: '', departamento: '', ciudad: ''}
        curriculums: [], //[{idCV: '', nombreCV: '', fechaCreacion: ''}]    
        fotoPerfil: '',
        medioPago: [],
        sucursales: [],
        rubros: [],
        fechaFundacion: null
    });

    userRouter.save().then(result => {
        const token = jwt.sign({ _id: userRouter._id }, 'secretkey');
        res.status(200).json({ token, 'idUser': userRouter._id, 'tipo': userRouter.tipoUsuario });
        res.end();


    }).catch(error => {
        res.send(error);
        res.end();
    });
});


//Obtener un usuario
router.get('/:idUser', function(req, res) {
    console.log(req.params.idUser);
    usuario.find({ _id: Mongoose.Types.ObjectId(req.params.idUser) })
        .then(result => {
            res.send(result[0]);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

//Obtener todos los usuarios -- solo se obtiene el correo del usuario
router.get('/', function(req, res) {
    usuario.find({

    }, {
        correo: 1
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Actualizar usuario empleado

router.put('/updateEmployee/:idUser', async(req, res) => {
    await usuario.updateOne({
            _id: req.params.idUser
        }, {
            "nombreCompleto": req.body.nombreCompleto,
            /*"correo": req.body.correo,*/
            "profesion": req.body.profesion,
            "fechaNacimiento": req.body.fechaNacimiento,
            "genero": req.body.genero,
            /*"curriculums": req.body.curriculums,
            /*"fotoPerfil":req.body.urlFotoPerfil,
            "medioPago": req.body.medioPago*/
        })
        .then(result => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
});

//Actualizar usuario empresa

router.post('/updateCompany/:idUser', async(req, res) => {
    await usuario.updateOne({
            _id: req.params.idUser
        }, {
            "nombreCompleto": req.body.nombreCompleto,
            "correo": req.body.correo,
            /*"fotoPerfil":req.body.fotoPerfil,/*/
            "sucursales": req.body.sucursales,
            "rubros": req.body.rubros,
            "fechaFundacion": req.body.fechaFundacion
        })
        .then(result => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
});

//Actualizar solo contraseña

router.post('/updatePassword/:idUser', async(req, res) => {
    const hash = await bcrypt.hashSync(req.body.newPassword, 10)
    const user = await usuario.findOne({ '_id': req.params.idUser })

    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
        return res.status(401).json({ "message": 'La contraseña anterior no coincide.' });
    }

    usuario.updateOne({ _id: req.params.idUser }, {
            password: hash
        })
        .then(() => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end()
        }).catch(error => {
            res.send(error);
            res.end();
        })

})

//Eliminar un usuario
router.delete('/:id', function(req, res) {
    usuario.remove({
        _id: req.params.id
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});



function verifyToken(req, res, next) {
    if (!req.headers.authorization) {}

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey')
    console.log(payload);
    req.userId = payload._id;
    next();
}


// multer disk storage

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})


var upload = multer({ storage: storage })


// subir una foto de perfil 

router.put('/profilePic/:idUser', upload.single('image'), async(req, res) => {
    console.log(req.file);
    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil actualizada con exito' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

// borrar una foto de perfil 

router.put('/deletePic/:idUser', async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { fotoPerfil: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.fotoPerfil));
    }
    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": "" })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil Removida' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})

//actualizar una foto de perfil 

router.put('/updatePic/:idUser', upload.single('image'), async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { fotoPerfil: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.fotoPerfil));
    }

    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil Renovada' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})


// subir un cv en pdf 

router.put('/CV/:idUser', upload.single('curriculums'), async(req, res) => {
    await usuario.updateOne({ _id: req.params.idUser }, { "curriculums": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Curriculum en linea' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

// borrar un cv en pdf

router.put('/deleteCV/:idUser', async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { curriculums: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.curriculums));
    }
    await usuario.updateOne({ _id: req.params.idUser }, { "curriculums": "" })
        .then(result => {
            res.status(200).json({ 'message': 'Curriculum Removido' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})

//actualizar un cv en pdf

router.put('/updateCV/:idUser', upload.single('curriculums'), async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { curriculums: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.curriculums));
    }
    await usuario.updateOne({ _id: req.params.idUser }, { "curriculums": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Curriculum Renovado' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})

router.get('/profilePic/:idUser', function(req, res) {
    console.log('..', req.params.idUser);
    usuario.findById(req.params.idUser, { fotoPerfil: 1 })
        .then(result => {
            console.log('hola');
            console.log(path.join(__dirname, '..', result.fotoPerfil));
            res.sendFile(path.join(__dirname, '..', result.fotoPerfil));

        })
        .catch();

    /* res.sendFile(path.join('..',foto.fotoPerfil)); */

    /* res.sendFile(path.join( '..',`${req.params.fileName}`)); */
});


module.exports = router;