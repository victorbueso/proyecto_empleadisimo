const { io } = require('../index');
const usuarios = require('../models/usuarios');
const { Users } = require('./users')

const user = new Users();

io.on('connect', (client) => {

    client.on("ObtainData", (data) => {
        
        var connectedUser = {
            socketId: client.id,
            id: data['_id']
        }
  
        user.addUser(connectedUser);  
    })
    
    client.on('sendMessage', (data) => {        
    
        const date = new Date();        
        var socketId = user.getSocketId(data['idCompany']); 
            
        if(socketId.length > 0){
            console.log(socketId);
            socketId = socketId[0]['socketId'];
            client.to(socketId).emit('recieveMessage', {
                message: data['content']
            })             
        }
        
        chatInformation = {
            idUserE : data.idUser,
            idUserR : data.idCompany,
            content : data.content,
        };
        
        user.saveChat(chatInformation)

    })
    
})