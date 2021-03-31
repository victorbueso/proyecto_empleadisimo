const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    users: {
        type: Array, 
        require: true
    },
    messages: {
        content : {
            type: String,
            require: true
        },
        date: {
            type: String, 
            require: true
        },
        hour:{
            type: String, 
            require: true
        },
        idUser: {
            type: String, 
            required: true
        }
    }
})

module.exports = mongoose.model('chat', Schema)