const usuarios = require('../models/usuarios');
const { Users } = require('./users')
const { io } = require('../index');

const user = new Users();

io.on('connect', (client) => {
    
    client.on("ObtainData", (data) => {
        
        if(data){
            var connectedUser = {
                socketId: client.id,
                id: data['_id']
            }
            user.addUser(connectedUser);  
        }

    })
  
    client.on('sendMessage', (data) => {        
    
        const date = new Date();        
        var socketId = user.getSocketId(data['idCompany']); 
        
        chatInformation = {
            idUserE : data.idUser,
            idUserR : data.idCompany,
            content : data.content,
        };
        
        var message = [];

        user.saveChat(chatInformation, data.idUser)
        .then((res) => {
            if(socketId.length > 0){
                io.to(socketId[0]['socketId']).emit("messageServer", {
                    message: res
                })
            }
        });
        
    })
})