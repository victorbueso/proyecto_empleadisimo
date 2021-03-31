const { io } = require('../index');
const { Users } = require('./users')

const user = new Users();

io.on('connect', (client) => {

    client.on("ObtainData", (data) => {
        
        var connectedUser = {
            socketId: client.id,
            email: data['email']
        }
        
        user.addUser(connectedUser);

    })
    

    client.on('sendMessage', (data) => {        
    
        const date = new Date();        
        user.saveChat(
            data['content'], 
            `${ date.getDay() }/${ date.getMonth() }/${ date.getFullYear() }`,
            `${ date.getHours() }:${ date.getMinutes() }`,
            data['idUser'],
            )

    })
    
})