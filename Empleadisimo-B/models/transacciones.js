const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    cantidadTransferencia: Number,
    medioPago: mongoose.SchemaTypes.Mixed,              //{_id: '', tipoPago: 'Number', datos: '{}', tituloMedio: 'String', _idUsuario: ''}
    moneda: String,
    isv: Number,
    usuario: mongoose.SchemaTypes.Mixed,                //{nombreCompleto: '', _idUsuario: ''}
    fechaTransaccion: Date,                
    detalle: String,             
    titulo: String,                 
});

module.exports = mongoose.model('transacciones', schema);