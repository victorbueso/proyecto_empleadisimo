const express = require('express');
const router = express.Router();
var cv = require('../models/cv');

//Crear un cv
router.post('/', function(req, res){
    let curriculumRouter = new usuario({
        nombreCompleto: req.body.nombreCompleto,
        numidentidad: req.body.identidad,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        educacion: {                                            //Usuario: 0, Empresa: 1, Administrador: 2
            tituloEducacion: req.body.tituloEducacion,
            instituto: req.body.instituto,
            duracionEducacion: req.body.duracionEducacion,
        },
        empleos: {
            tituloEmpleo: req.body.tituloEmpleo,
            descripcionEmpleo: req.body.descripcionEmpleo,
            duracionEmpleo: req.body.duracionEmpleo,
        },
        documentos: {                                          //[{nombreDocumento: '', fechaEmision: '', fechaVencimiento: '', detalles: ''}]
            nombreDocumento: req.body.nombreDocumento,                 
            fechaEmision: req.body.fechaEmision,                 
            fechaVencimiento: req.body.fechaVencimiento,                 
            detalle: req.body.detalle,                               
        },
        validacion: {                                          //{}
            //pendiente
        },
        cvPDF: {                                               //{}
            //pendiente
        },
    });

    curriculumRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener un cv
router.get('/:id', function(req,res){
    cv.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todos los cv
router.get('/',function(req,res){
    cv.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar un cv
router.delete('/:id', function(req,res){
    cv.remove(
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