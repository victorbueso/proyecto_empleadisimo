const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var publicaciones = require('../models/publicaciones');
const sendEmail = require('../modules/contratadoMail');

//Crear una publicacion
router.post('/', function(req, res) {
    var io = req.app.get('socketio');
    let publicationsRouter = new publicaciones({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        cantidadPago: req.body.cantidadPago,
        fechaPublicacion: req.body.fechaPublicacion,
        fechaVencimiento: req.body.fechaVencimiento,
        profesion: req.body.profesion,
        ubicacion: { //{pais: '', departamento: '', ciudad: ''}
            pais: req.body.pais,
            departamento: req.body.departamento,
            ciudad: req.body.ciudad,
        },
        modalidad: req.body.modalidad,
        idEmpresa: req.body.idEmpresa,
        usuarios: [],
        estado: 'vigente'
    });

    publicationsRouter.save().then(result => {
        res.send(result);
        io.emit("nuevaPublicacion", result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener una publicacion
router.get('/:id', function(req, res) {
    publicaciones.find({ _id: req.params.id }).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener todas las publicaciones
router.get('/', function(req, res) {
    publicaciones.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener publicaciones vigentes
router.get('/posts/active', function(req, res){
    publicaciones.find(
        {estado:'vigente'},
        {})
    .then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Eliminar una publicacion
router.delete('/:id', function(req, res) {
    publicaciones.remove({
        _id: req.params.id
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Obtener publicaciones de una empresa
router.get('/posts/:idCompany', function(req, res) {

    publicaciones.find({
        idEmpresa: mongoose.Types.ObjectId(req.params.idCompany)
    }, {}).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

//Actualizar una publicación a la que ha aplicado un usuario
router.put('/', async(req, res) => {
    //var io = req.app.get('socketio');
    const publicacion = await publicaciones.findOne({
        _id: req.body.idPublicacion
    })

    publicaciones.updateOne({
        _id: req.body.idPublicacion
    }, {
        $addToSet: {
            usuarios: mongoose.Types.ObjectId(req.body.idEmpleado),
            curriculumUsuario: req.body.curriculum
        }
    }).then(() => {
        //io.emit(publicacion.idEmpresa,{idEmpresa : publicacion.idEmpresa, idPublicacion: req.body.idPublicacion, titulo : publicacion.titulo});
        res.json({ idEmpresa: publicacion.idEmpresa, titulo: publicacion.titulo });
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});


/* Obtener info de los empleados que aplicaron a publicacion */

router.get('/posts/getInfo/:idPost', function(req,res){
    publicaciones.aggregate([
        {
            $lookup:{
                from : "usuarios",
                localField: "usuarios",
                foreignField : "_id",
                as: "resultado"
            }
        },
        {
            $match:{
                _id:mongoose.Types.ObjectId(req.params.idPost)
            }
        },
        {
            $project: {
                profesion:true,
                titulo : true,
                descripcion : true,
                cantidadPago: true,
                fechaPublicacion : true,
                fechaVencimiento:true,
                ubicacion:true,
                modalidad:true,
                estado:true,
                curriculumUsuario: true,
                "resultado._id":true,
                "resultado.nombreCompleto" : true,
                "resultado.correo":true,
                "resultado.fotoPerfil": true
            }
        }
    ]).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

/* Actualizar publicacion */
router.put('/post/update/:idPost', function(req, res){
    publicaciones.updateOne({
        _id: req.params.idPost
    },
    {
        titulo: req.body.title,
        descripcion: req.body.description,
        cantidadPago: req.body.salary,
        fechaVencimiento: req.body.expirationDate,
        profesion: req.body.profession,
        "ubicacion.pais": req.body.country,
        "ubicacion.departamento": req.body.department,
        "ubicacion.ciudad": req.body.city,
        modalidad: req.body.modality
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    })
});


/* Actualizar estado de publicacion */
router.post('/post/updateStatus/:idPost', function (req, res){
    publicaciones.updateOne({
        _id : req.params.idPost
    },
    {
        estado : req.body.estado
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});

/*Agregar usuario contratado */
router.post('/post/:idPost/hireUser/:idUser', function(req, res){
    let datos = req.body;
    publicaciones.updateOne({
        _id: req.params.idPost
    },
    {
        $set:{
            contratado : req.params.idUser
        }
    }).then(() => {
        sendEmail(datos);
        res.status(200).send();
        res.end();
    }).catch( error => {
        res.send(error);
        res.send();
    })
});

module.exports = router;