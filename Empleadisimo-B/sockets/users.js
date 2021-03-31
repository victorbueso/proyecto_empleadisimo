var message = require('../models/messages');
var mongoose = require('mongoose');

class Users{

    constructor(){
        this.users = [];
    }

    addUser(user){
        this.users.push(user)
    }

    getUsers(){
        return this.users;
    }   

    saveChat(content, date, hour, idUser){
        
        let newMessage = new message({
            content, 
            date, 
            hour, 
            idUser
        })

        newMessage.save()
            .then( res => { 
            })
            .catch( err => {
            })
    }

}

module.exports = {
    Users
};