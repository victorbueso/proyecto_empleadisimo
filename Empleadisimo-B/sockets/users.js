var mongoose = require('mongoose');
var chat = require('../models/chat');
var user = require('../models/usuarios');
class Users{

    constructor(){
        this.users = [];
    }

    addUser(user){
        this.filterbyEmail(user);
        this.users.push(user)
    }

    getUsers(){
        return this.users;
    }   

    saveChat(chatInformation){

        this.chatExits(chatInformation['idUserE'], chatInformation['idUserR'])
            .then(res => {

                if(chat.length == 0){
                    this.notExistingChat(chatInformation)
                }else{
                    this.existingChat(res)
                }

            })
            .catch(err => console.error(err))
        
    }

    filterbyEmail(user){
        this.users = this.users.filter(userC => userC['id'] != user['id']);
    }

    getSocketId(idUser){
        return this.users.filter( userC => userC['id'] == idUser );
    }

    async chatExits(idUser, idCompany){  
        return await chat.find({ users : idUser, users: idCompany })
    }

    notExistingChat(chatInformation){
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
                console.log("") 
            })
            .catch( err => {
            })   
    }

    existingChat(updateChat){
        console.log("Se modificar el chat");
    }
}

module.exports = {
    Users
};