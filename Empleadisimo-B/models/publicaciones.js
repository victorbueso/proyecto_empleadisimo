const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    cantidadPago: Number,
    fechaPublicacion: Date,
    fechaVencimiento: Date,
    cv: mongoose.SchemaTypes.Mixed,                     //[{idCV: '', nombreCV: '', fechaCreacion: ''}]
    profesion: Array,
    duracionPublicacion: String,                        //Masculino: 1, Femenino: 0
    correo: String,                 
    ubicacion: mongoose.SchemaTypes.Mixed,              //{pais: '', departamento: '', ciudad: ''}
    modalidad: Number,                                  //presencial: 1, semiPresencial: 2, homeOffice: 3
});

module.exports = mongoose.model('publicaciones', schema);