const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const http = require('http');
var usuariosRouter = require('./routes/usuarios-router');
var cvRouter = require('./routes/cv-router');
var publicacionesRouter = require('./routes/publicaciones-router');
var transaccionesRouter = require('./routes/transacciones-router');
var contratosRouter = require('./routes/contratos-router');
var database = require('./modules/database');
//var path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:4200']
    }
});

server.listen(3000, () => {
    console.log(`Example app listening on 3000 port!`)
});

//Middleware
app.set('socketio', io);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/usuarios', usuariosRouter);
app.use('/cv', cvRouter);
app.use('/publicaciones', publicacionesRouter);
app.use('/transacciones', transaccionesRouter);
app.use('/contratos', contratosRouter);
app.use('/uploads', express.static(path.resolve('uploads')));
module.exports = {
    io
}
require('./sockets/sockets');

app.get('/', (req, res) => {
    res.send('Hello World!');
    res.end();
});