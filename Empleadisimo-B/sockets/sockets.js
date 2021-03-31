const { io } = require('../index');
io.on('connect', (client) => {
    console.log("Se conecto")
})