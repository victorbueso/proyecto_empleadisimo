const express = require('express');
const router = express.Router();
var publicaciones = require('../models/publicaciones');

//Crear una publicacion
router.post('/', function(req, res){
    let publicationsRouter = new usuario({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        cantidadPago: req.body.pago,
        fechaPublicacion: req.body.fechaPublicacion,
        fechaVencimiento: req.body.fechaVencimiento,
        cv: {                                                      //[{idCV: '', nombreCV: '', fechaCreacion: ''}]
            idCV: req.body.idCV,
            nombreCV: req.body.nombreCV,
            fechaCreacion: req.body.fechaCreacion,
        },
        empleos: {
            tituloEmpleo: req.body.tituloEmpleo,
            descripcionEmpleo: req.body.descripcionEmpleo,
            duracionEmpleo: req.body.duracionEmpleo,
        },
        profesion: req.body.profesion,
        duracionPublicacion: req.body.duracionPublicacion,
        correo: req.body.correo,
        ubicacion: {                                               //{pais: '', departamento: '', ciudad: ''}
            pais: req.body.pais,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
        },
        modalidad: req.body.modalidad
    });

    publicationsRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener una publicacion
router.get('/:id', function(req,res){
    publicaciones.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todas las publicaciones
router.get('/',function(req,res){
    publicaciones.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar una publicacion
router.delete('/:id', function(req,res){
    publicaciones.remove(
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