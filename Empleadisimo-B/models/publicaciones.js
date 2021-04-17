const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    cantidadPago: Number,
    fechaPublicacion: String,
    fechaVencimiento: String,
    profesion: Array,
    duracionPublicacion: String,                        //Masculino: 1, Femenino: 0          
    ubicacion: mongoose.SchemaTypes.Mixed,              //{pais: '', departamento: '', ciudad: ''}
    modalidad: Number,                                  //presencial: 1, semiPresencial: 2, homeOffice: 3
    idEmpresa: mongoose.Types.ObjectId,
    usuarios: Array,
    curriculumUsuario:Array,
    contratado: mongoose.Types.ObjectId,
    estado : String
});

module.exports = mongoose.model('publicaciones', schema);