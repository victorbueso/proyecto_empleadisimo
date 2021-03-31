const mongoose = require('mongoose');

let schema = new mongoose.Schema({

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

})

module.exports = mongoose.model('message', schema);