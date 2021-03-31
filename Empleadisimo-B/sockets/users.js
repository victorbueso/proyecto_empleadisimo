var mongoose = require('mongoose');
var chat = require('../models/chat');
class Users{

    constructor(){
        this.users = [];
    }

    addUser(user){
        this.filterbyEmail(user)
        this.users.push(user)
    }

    getUsers(){
        return this.users;
    }   

    saveChat(chatInformation){
        
        var date = new Date();
        let newChat = new chat({
            users : [
                chatInformation.idUserE,
                chatInformation.idUserR
            ],
            messages : {
                content: chatInformation.content,
                date : `${ date.getDay() }/${ date.getMonth() }/${ date.getFullYear() }`,
                hour : `${ date.getHours() }:${ date.getMinutes() }`,
                idUser : chatInformation.idUserE
            }        
        })

        newChat.save()
            .then( res => { 
            })
            .catch( err => {
            })
    }

    filterbyEmail(user){
        this.users = this.users.filter(userC => userC['email'] != user['email']);
    }

}

module.exports = {
    Users
};