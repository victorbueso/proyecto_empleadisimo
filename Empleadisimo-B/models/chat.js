const mongoose = require('mongoose');

let schema = new mongoose.Schema({

    name: {
        contenido: {
            type: String,
            required: true
        },
        fecha: {
            type: String,
            required: true
        }
    }

})

module.exports = mongoose.model('mensaje', schema);