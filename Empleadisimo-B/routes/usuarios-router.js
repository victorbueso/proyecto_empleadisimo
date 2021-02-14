const express = require('express');
const router = express.Router();
var usuario = require('../models/usuarios');

//Crear un usuario simple
router.post('/', function(req, res){

    let userRouter = new usuario({
        nombreCompleto:'',
        correo: req.body.correo,
        password: req.body.password,
        profesion: [],
        tipoUsuario: req.body.tipoUsuario,              //Usuario: 0, Empresa: 1, Administrador: 2
        fechaNacimiento: null,
        genero: 1,                        //Masculino: 1, Femenino: 0
        rating: [],
        ubicacion: {departamento:'',pais:'',ciudad:''},                                    //{pais: '', departamento: '', ciudad: ''}
        curriculums: [],                                   //[{idCV: '', nombreCV: '', fechaCreacion: ''}]    
        fotoPerfil: req.body.fotoPerfil,
        medioPago: []
    });

    userRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener un usuario
router.get('/:id', function(req,res){
    usuario.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
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