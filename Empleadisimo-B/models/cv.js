const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombreCompleto: String,
    identidad: String,
    telefono: Array,
    direccion: String,
    educacion: mongoose.SchemaTypes.Mixed,              //[{titulo: '', institucion: '', duracion: ''}]
    empleos: mongoose.SchemaTypes.Mixed,                //[{titulo: '', descripcionEmpleo: '', duracion: ''}]
    documentos: mongoose.SchemaTypes.Mixed,             //[{nombreDocumento: '', fechaEmision: '', fechaVencimiento: '', detalles: ''}]
    //validacion: mongoose.SchemaTypes.Mixed,           //[{muyInsatisfecho: 1, insatisfecho: 2, satisfecho: 3, muySatisfecho: 4, excelente: 5}]
    cvPDF: mongoose.SchemaTypes.Mixed,                  //{}
});

module.exports = mongoose.model('cv', schema);