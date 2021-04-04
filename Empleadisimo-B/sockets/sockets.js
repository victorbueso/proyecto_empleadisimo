const { io } = require('../index');
const usuarios = require('../models/usuarios');
const { Users } = require('./users')

const user = new Users();

io.on('connect', (client) => {
    
    client.on("ObtainData", (data) => {
        
        if(data){
            var connectedUser = {
                socketId: client.id,
                id: data['_id']
            }
      
            user.addUser(connectedUser);  
        }else{
            console.log("No llega durante el registro");
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

        user.saveChat(chatInformation)
        .then((res) => {
            if(socketId.length > 0){
                io.to(socketId[0]['socketId']).emit("messageServer", {
                    message: res
                })
            }
        });
        
    })
})