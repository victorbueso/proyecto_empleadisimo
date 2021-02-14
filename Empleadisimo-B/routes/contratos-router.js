const express = require('express');
const router = express.Router();
var contratos = require('../models/contratos');

//Crear un contrato
router.post('/', function(req, res){
    let contractsRouter = new usuario({
        tituloContrato: req.body.tituloContrato,
        usuario: {                                              //{nombreCompleto: '', _idUsuario: ''}
            _idUsuario: req.params._idUsuario,
            nombreCompleto: req.body.nombreCompleto
        },
        fechaInicio: req.body.fechaInicio,              
        fechaFinalizacion: req.body.fechaFinalizacion,              
        descripcion: req.body.descripcion,                   
    });

    contractsRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener un contrato
router.get('/:id', function(req,res){
    contratos.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todos los contratos
router.get('/',function(req,res){
    contratos.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar un contrato
router.delete('/:id', function(req,res){
    contratos.remove(
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