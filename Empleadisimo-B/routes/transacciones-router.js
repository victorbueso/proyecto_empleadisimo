const express = require('express');
const router = express.Router();
var transacciones = require('../models/transacciones');

//Crear una transaccion
router.post('/', function(req, res){
    let transactionsRouter = new usuario({
        cantidadTransferencia: req.body.cantidadTransferencia,
        medioPago: {                                    //{_id: '', tipoPago: 'Number', datos: '{}', tituloMedio: 'String', _idUsuario: ''}
            _id: req.body.id,
            tipoPago: req.body.tipoPago,
            datos: {
                //pendiente
            },
            tituloMedio: req.body.tituloMedio
        },
        moneda: req.body.moneda,
        isv: req.body.isv,
        usuario: {                                       //{nombreCompleto: '', _idUsuario: ''}
            _idUsuario: req.params._idUsuario,
            nombreCompleto: req.body.nombreCompleto
        },
        fechaTransaccion: req.body.fechaTransaccion,              
        detalle: req.body.detalle,
        titulo: req.body.titulo,                        
    });

    transactionsRouter.save().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener una transaccion
router.get('/:id', function(req,res){
    usuario.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todas las transacciones
router.get('/',function(req,res){
    transacciones.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar una transaccion
router.delete('/:id', function(req,res){
    transacciones.remove(
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