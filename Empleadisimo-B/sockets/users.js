var mongoose = require('mongoose');
var chat = require('../models/chat');
const { update } = require('../models/usuarios');
var user = require('../models/usuarios');
class Users{

    constructor(){
        this.users = [];
        this.lastMessage = [];
    }

    addUser(user){
        this.filterbyEmail(user);
        this.users.push(user)
    }

    getUsers(){
        return this.users;
    }   

    saveChat(chatInformation, clientId){

        return new Promise(resolved => { 
            this.chatExits(chatInformation['idUserE'], chatInformation['idUserR'])
            .then(res => {
                if(res.length == 0){
                    resolved(
                        this.notExistingChat(chatInformation)
                    )
                }else{
                    resolved(
                    this.existingChat(res, chatInformation, clientId)
                    .then(res => res)
                    .catch(err => console.error(err)))
                }

            })
            .catch()
        })
    }

    filterbyEmail(user){
        this.users = this.users.filter(userC => userC['id'] != user['id']);
    }

    getSocketId(idUser){
        return this.users.filter( userC => userC['id'] == idUser );
    }

    async chatExits(idUser, idCompany){  
        let eChats = await chat.find({ users : idUser });
        if(eChats.length > 0){
            for(var i = 0; i < eChats.length; i++){
                if(eChats[i]['users'].includes( idCompany )){
                    return [eChats[i]];
                }
            }
        }
        return [];
    }

    notExistingChat(chatInformation){
        var date = new Date();
        let newMessage = new Object
        
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
            },
            user1 : {
                idUser : chatInformation.idUserE, 
                notification : 0
            },
            user2 : {
                idUser : chatInformation.idUserR,
                notification : 1
            }
        })

        newChat.save()
            .then( res => { 
            })
            .catch( err => {
            })   
            
        return newChat;
    
    }

    async existingChat(updateChat, chatInformation, clientId){

        var date = new Date();
        let newMessage = {
            content: chatInformation['content'],
            date : `${ date.getDay() }/${ date.getMonth() }/${ date.getFullYear() }`,
            hour : `${ date.getHours() }:${ date.getMinutes() }`,
            idUser: chatInformation['idUserE'],
            users : [
                updateChat[0]['users'][0],
                updateChat[0]['users'][1]
            ],
            user1 : {
                idUser1 : updateChat[0]['user1']['idUser'],
                notification : updateChat[0]['user1']['notification']
            },
            user2 : {
                idUser2 : updateChat[0]['user2']['idUser'],
                notification : updateChat[0]['user2']['notification']
            }
        }

        if(String(clientId) == String(updateChat[0]['user1']['idUser'])){
            await chat.updateOne(
                { _id : updateChat[0]["_id"] },
                {
                    $push : { messages : newMessage},
                    'user2.notification' : updateChat[0]['user2']['notification'] + 1
                }
            )
            .then((res) => {})
            .catch()
        }else{
            await chat.updateOne(
                { _id : updateChat[0]["_id"] },
                {
                    $push : { messages : newMessage},
                    'user1.notification' : updateChat[0]['user1']['notification'] + 1
                }
            )
            .then((res) => {})
            .catch()
        }
        return newMessage
    }
 
    obtainPosition(users, idUser){
        for(var i = 0; i < users.length; i++){
            if(users[i] == idUser){
                return i;
            }
        }
    }

}

module.exports = {
    Users
};
