var mongoose = require('mongoose');
var chat = require('../models/chat');
const { update } = require('../models/usuarios');
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
                if(res.length == 0){
                    return this.notExistingChat(chatInformation)
                }else{
                    return this.existingChat(res, chatInformation);
                }

            })
            .catch()

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
                return newChat;
            })
            .catch( err => {
            })   
    }

    async existingChat(updateChat, chatInformation){

        var date = new Date();
        let newMessage = {
            content: chatInformation['content'],
            date : `${ date.getDay() }/${ date.getMonth() }/${ date.getFullYear() }`,
            hour : `${ date.getHours() }:${ date.getMinutes() }`,
            idUser: chatInformation['idUserE'] 
        }
        await chat.updateOne(
            { _id : updateChat[0]["_id"] },
            { $push : { messages : newMessage} }
        )
        .then(() => newMessage)
        .catch()
    }
}

module.exports = {
    Users
};