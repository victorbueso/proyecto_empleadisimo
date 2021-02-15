const express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
var usuariosRouter = require('./routes/usuarios-router');
var cvRouter = require('./routes/cv-router');
var publicacionesRouter = require('./routes/publicaciones-router');
var transaccionesRouter = require('./routes/transacciones-router');
var contratosRouter = require('./routes/contratos-router');
var database = require('./modules/database');

var app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/usuarios', usuariosRouter);
app.use('/cv', cvRouter);
app.use('/publicaciones', publicacionesRouter);
app.use('/transacciones', transaccionesRouter);
app.use('/contratos', contratosRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
    res.end();
});
app.listen(3000, () => {
console.log(`Example app listening on 3000 port!`)
});