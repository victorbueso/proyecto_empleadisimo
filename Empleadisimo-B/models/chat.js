const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    users: {
        type: Array, 
        require: true
    },
    messages: {
        type: Array, 
        required: true
    }
})

module.exports = mongoose.model('chat', Schema)