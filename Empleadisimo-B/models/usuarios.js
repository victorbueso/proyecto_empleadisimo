const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    nombreCompleto: String,
    correo: String,
    password: String,
    profesion: Array,
    tipoUsuario: Number, //Usuario: 0, Empresa: 1, Administrador: 2
    fechaNacimiento: String,
    genero: Number, //Masculino: 1, Femenino: 0
    rating: Array, //[{muyInsatisfecho: 1, insatisfecho: 2, satisfecho: 3, muySatisfecho: 4, excelente: 5}]
    ubicacion: mongoose.SchemaTypes.Mixed, //{pais: '', departamento: '', ciudad: ''}
    curriculum: Array, //[{idCV: '', nombreCV: '', fechaCreacion: ''}]
    fotoPerfil: String,
    medioPago: Array, //[{_id: '', tipoPago: 'number', datos: 'JSON', tituloMedio: 'String', _idUsuario: ''}]
    sucursales: Array,
    rubros: Array,
    fechaFundacion: String,
    notificaciones: Array,
<<<<<<< HEAD
    socketiD: String
=======
    estado: String
>>>>>>> 0dc053582c3f3788dd3bbc502f5e7711ce7425d7
});

module.exports = mongoose.model('usuarios', schema);