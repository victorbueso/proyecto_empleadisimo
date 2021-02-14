const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    tituloContrato: String,
    usuario: mongoose.SchemaTypes.Mixed,                        //{nombreCompleto: '', _idUsuario: ''}
    fechaInicio: Date,              
    fechaFinalizacion: Date,                
    descripcion: String,             
});

module.exports = mongoose.model('contratos', schema);