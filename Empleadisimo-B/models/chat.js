const mongoose = require('mongoose');

let Schema = mongoose.Schema({
    users : {
        type : Array, 
        require : true
    },
    messages : {
        type : Array, 
        required : true
    },
    user1 : {
        type : Object, 
        required : true
    },
    user2 : {
        type : Object, 
        require: true
    }
})

module.exports = mongoose.model('chat', Schema)