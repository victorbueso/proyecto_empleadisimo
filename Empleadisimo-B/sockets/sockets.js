const { io } = require('../index');
const { Users } = require('./users')

const user = new Users();

io.on('connect', (client) => {

    client.on("ObtainData", (data) => {
        
        var connectedUser = {
            socketId: client.id,
            email: data['correo']
        }
        
        user.addUser(connectedUser);
        
    })
    

    client.on('sendMessage', (data) => {        
    
        const date = new Date();        
        chatInformation = {
            idUserE : data.idUser,
            idUserR : data.idCompany,
            content : data.content,
        };


        user.saveChat(chatInformation);       


    })
    
})