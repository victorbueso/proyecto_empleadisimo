const express = require('express');
const router = express.Router();
var usuario = require('../models/usuarios');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var path = require('path');
var fs = require('fs-extra');
const uuid = require("uuid");
const mongoose = require('mongoose');
const usuarios = require('../models/usuarios');
const nodemailer = require('nodemailer');
const email = require('../modules/email');
const chat = require('../models/chat');
const { find } = require('../models/usuarios');

//Router para modificar el estado de las notificaciones
router.put("/messageSeen/:idUser?", async (req, res)=> {
    if(!req.params.idUser){
        res.status(400).json({
            message: "No se envio ningun id"
        })
    res.end()
    }
    new Promise(resolved => {
        chat.findOne(
        { 
            users : req.params.idUser,
            users : req.body._id
        })
        .then(udpatechat => {
            if(String(udpatechat['user1']['idUser']) == String(req.params.idUser)){
                resolved(
                    chat.findOneAndUpdate(
                    {
                        users : req.params.idUser,
                        users : req.body._id
                    },
                    {
                        'user1.notification' : 0
                    },
                    {
                        useFindAndModify: false
                    }
                ))
            }else{
                resolved(
                    chat.findOneAndUpdate(
                        {
                            users : req.params.idUser,
                            users : req.body._id
                        },
                        {
                            'user2.notification' : 0
                        },
                        {
                            useFindAndModify: false
                        }
                    )
                )
            }
        })
        .catch( err => console.error(err))

    })
    res.end()

})

// Router para conseguir la informacion de la compañia. 

router.get("/obtainChat/:idUser?", async function(req, res){

    let userChat = await chat.find({ users : req.params.idUser })
    let usersMessages = []

    for(var i = 0; i < userChat.length; i++){
        for(var j = 0; j < userChat[i]['users'].length; j++){
            if(userChat[i]['users'][j] != req.params.idUser){
                usersMessages.push(await usuario.findById(userChat[i]['users'][j])); 
            }
        }
    }

    res.json({
        messages: userChat,
        users: usersMessages
    });
    res.end();
})

router.get("/company/:idEmpresa", async function(req, res) {

    var user = await usuario.findById(req.params.idEmpresa);
    user.password = ""
    res.json({
        user
    })
    res.end();
})

//login user
router.post("/signin", async(req, res) => {
    const correo = req.body.correo;
    const password = req.body.password;
    const user = await usuario.findOne({ 'correo': correo })
    if (user == null) {
        return res.status(401).json({ "message": "No se encontró ningún usuario registrado con ese correo electrónico" });
    }

    var resultado = bcrypt.compareSync(password, user.password);
    if (!resultado) {
        return res.status(401).json({ "message": 'Contraseña incorrecta' });
    }

    if(user.estado=="bloqueado"){
        return res.status(401).json({"message": 'Este usuario se encuentra bloqueado. Para mayor información escribir al correo empleadisimohn@gmail.com'})
    }

    if(user.estado=="eliminado"){
        return res.status(401).json({"message": 'Este usuario ha sido eliminado. Si consideras que se trata de un error escribir al correo empleadisimohn@gmail.com'})
    }

    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token, 'idUser': user._id, 'tipo': user.tipoUsuario });
});

//Crear un usuario simple
router.post('/', async function(req, res) {
    const correo = req.body.correo;
    const hash = await bcrypt.hashSync(req.body.password, 10)
    const user = await usuario.findOne({ 'correo': correo });
    if (user != null) {
        return res.status(401).json({ "message": "Correo en uso" });
    }

    let userRouter = new usuario({
        nombreCompleto: '',
        correo: req.body.correo,
        password: hash,
        profesion: [],
        tipoUsuario: req.body.tipoUsuario, //Usuario: 0, Empresa: 1, Administrador: 2
        fechaNacimiento: null,
        genero: 1, //Masculino: 1, Femenino: 0
        rating: [], //{pais: '', departamento: '', ciudad: ''}
        curriculum: [], //[{idCV: '', nombreCV: '', fechaCreacion: ''}]    
        fotoPerfil: '',
        medioPago: [],
        sucursales: [],
        rubros: [],
        fechaFundacion: null,
        fechaRegistro: new Date(),
        notificaciones: [],
        estado : 'activo',
        seguidores: [],
        siguiendo:[],
        verified: false
    });

    userRouter.save().then(result => {
        const token = jwt.sign({ _id: userRouter._id }, 'secretkey');
        res.status(200).json({ token, 'idUser': userRouter._id, 'tipo': userRouter.tipoUsuario });
        res.end();


    }).catch(error => {
        res.send(error);
        res.end();
    });
});


//Obtener un usuario
router.get('/:idUser', function(req, res) {
    usuario.find({ _id: mongoose.Types.ObjectId(req.params.idUser) })
        .then(result => {
            res.send(result[0]);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

//Obtener todos los usuarios -- solo se obtiene el correo del usuario
router.get('/', function(req, res) {
    usuario.find({

    }, {
        correo: 1
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

//Actualizar usuario empleado

router.put('/updateEmployee/:idUser', async(req, res) => {
    await usuario.updateOne({
            _id: req.params.idUser
        }, {
            "nombreCompleto": req.body.nombreCompleto,
            "profesion": req.body.profesion,
            "fechaNacimiento": req.body.fechaNacimiento,
            "genero": req.body.genero
        })
        .then(result => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
});

//Actualizar usuario empresa

router.post('/updateCompany/:idUser', async(req, res) => {
    await usuario.updateOne({
            _id: req.params.idUser
        }, {
            "nombreCompleto": req.body.nombreCompleto,
            "correo": req.body.correo,
            "sucursales": req.body.sucursales,
            "rubros": req.body.rubros,
            "fechaFundacion": req.body.fechaFundacion
        })
        .then(result => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
});

//Actualizar solo contraseña

router.post('/updatePassword/:idUser', async(req, res) => {
    const hash = await bcrypt.hashSync(req.body.newPassword, 10)
    const user = await usuario.findOne({ '_id': req.params.idUser })

    if (!bcrypt.compareSync(req.body.oldPassword, user.password)) {
        return res.status(401).json({ "message": 'La contraseña anterior no coincide.' });
    }

    usuario.updateOne({ _id: req.params.idUser }, {
            password: hash
        })
        .then(() => {
            res.status(200).json({ 'message': 'Datos actualizados correctamente' });
            res.end()
        }).catch(error => {
            res.send(error);
            res.end();
        })

})

//Eliminar un usuario
router.delete('/:id', function(req, res) {
    usuario.remove({
        _id: req.params.id
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});



function verifyToken(req, res, next) {
    if (!req.headers.authorization) {}

    const token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
        return res.status(401).send('Unauthorized request');
    }

    const payload = jwt.verify(token, 'secretkey')
    req.userId = payload._id;
    next();
}


// multer disk storage

var storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid.v4() + path.extname(file.originalname));
    }
})


var upload = multer({ storage: storage })


// subir una foto de perfil 

router.put('/profilePic/:idUser', upload.single('image'), async(req, res) => {
    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil actualizada con exito' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });
});

// borrar una foto de perfil 

router.put('/deletePic/:idUser', async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { fotoPerfil: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.fotoPerfil));
    }
    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": "" })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil Removida' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})

//actualizar una foto de perfil 

router.put('/updatePic/:idUser', upload.single('image'), async(req, res) => {
    const FP = await usuario.findById(req.params.idUser, { fotoPerfil: 1 });
    if (FP) {
        await fs.unlink(path.resolve(FP.fotoPerfil));
    }

    await usuario.updateOne({ _id: req.params.idUser }, { "fotoPerfil": req.file.path })
        .then(result => {
            res.status(200).json({ 'message': 'Foto de perfil Renovada' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        });

})


// subir un cv en pdf 

router.post('/CV/:idUser', upload.single('curriculums'), async(req, res) => {
    const { titulo } = req.body;
    const mimetype = req.file.mimetype;

    if (mimetype !== 'application/pdf') {
        return res.json({ message: 'Archivo no soportado, Solo se permiten archivos pdf', })
    }

    let date = new Date()

    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    var fd = '';

    if (month < 10) {
        fd = `${day}-0${month}-${year}`;
    } else {
        fd = `${day}-${month}-${year}`;
    }

    const arrtemp = { titulo: titulo, fecha: fd, rutaArchivo: req.file.path };

    await usuario.updateOne({ _id: req.params.idUser }, { $push: { curriculum: arrtemp } })
        .then(result => {
            res.status(200).json({ 'message': 'Curriculum en linea' });
            res.end();
        }).catch(error => {
            res.send(error);
            res.end()
        });
});

// borrar un cv en pdf

router.post('/deleteCV/:idUser', async(req, res) => {
    var fp = req.body.fp;
    let arr = [];

    usuario.findOne({ _id: req.params.idUser }, { curriculum: true }).
    then(result2 => {
        for (var i = 0; i < result2.curriculum.length; i++) {
            arr[i] = result2.curriculum[i];
        }

        const df = arr.findIndex( x => x.rutaArchivo === fp)
        fs.unlink(path.resolve(arr[df].rutaArchivo))
        arr.splice(df,1);
        

        usuario.updateOne({ _id: req.params.idUser }, { "curriculum": arr }).then().catch(error => {
            res.send(error);
            res.end()
        });
        res.status(200).json({ 'message': 'Curriculums removido' });
        res.end();
    }).catch(error2 => {
        res.send(error2);
        res.end();
    })

})

//actualizar un cv en pdf

router.put('/updateCV/:idUser', upload.single('curriculums'), async(req, res) => {
    var fp1 = req.body.fp1;
    const arr = []
    const arr1 = []
    const  mimetype = req.file.mimetype;

    if (mimetype !== 'application/pdf') {
        return res.json({ message: 'Archivo no soportado, Solo se permiten archivos pdf', })
    }

    

    usuario.find({_id: req.params.idUser},{curriculum: 1}).
    then(result2 => {
        for (var i = 0; i< result2.length; i++) {
            arr[i] = result2[i].curriculum; 
        }
    
        
        for (var i = 0; i< arr[0].length; i++) {
            arr1[i] = arr[0][i]; 
        }
            
        let date = new Date()

        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        var fd = '';
    
        if(month < 10){
            fd = `${day}-0${month}-${year}-U`;
          }else{
            fd = `${day}-${month}-${year}-U`;
          }

            fpd = arr1.find(o => o.rutaArchivo === fp1) 
            fs.unlink(path.resolve(fpd.rutaArchivo))

            const df = arr1.findIndex( x => x.rutaArchivo === fp1)
            arr1[df].rutaArchivo = req.file.path
           
            usuario.updateOne({ _id: req.params.idUser }, { "curriculum": arr1 }).then().catch(error => {
                res.send(error);
                res.end()
            });
            res.status(200).json({ 'message': 'CV actualizado exitosamente' });
            //return res.json(arr1);
        }).catch(error2 => {
            res.send(error2);
            res.end();
        })

})


// obtener las rutas de los cv del empleado

router.get('/CVinfo/:idUser', async(req, res) => {
    usuario.find({ _id: req.params.idUser }, { curriculum: 1 }).
    then(result => {
        const arr = []
        for (var i = 0; i < result.length; i++) {
            arr[i] = result[i].curriculum;
        }

        const arr1 = []
        for (var i = 0; i < arr[0].length; i++) {
            arr1[i] = arr[0][i].rutaArchivo;
        }
        return res.json(arr1);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })

})

router.get('/profilePic/:idUser', function(req, res) {
    usuario.findById(req.params.idUser, { fotoPerfil: 1 })
        .then(result => {
            res.sendFile(path.join(__dirname, '..', result.fotoPerfil));

        })
        .catch();

});

// Notificaciones 

//Obtener todas las notificaciones de un usuario

router.get('/notifications/:idUser', function(req, res) {
        usuarios.find({
            _id: req.params.idUser
        }, {
            notificaciones: true,
        }).then(result => {
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })
    
// Notificación de empleo para todos los empleados

router.put('/notifications/newPost', async(req, res) => {
     
    
    const FP = await usuario.findById(req.body.idEmpresa);
    
    
    usuarios.updateMany({
        _id: FP.seguidores
    }, {
        $push: {
            "notificaciones": {
                _id: new mongoose.Types.ObjectId(),
                idPublicacion: req.body.idPublicacion,
                titulo: req.body.titulo,
                fechaPublicacion: req.body.fechaPublicacion,
                estado: req.body.estado
            }
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
});
//Agregar notificación a empresa
router.put('/notifications/newPost/company/:idCompany', function(req, res) {
        var io = req.app.get('socketio');
        usuarios.updateOne({
            _id: req.params.idCompany
        }, {
            $push: {
                "notificaciones": {
                    _id: new mongoose.Types.ObjectId(),
                    idPublicacion: req.body.idPublicacion,
                    titulo: req.body.titulo,
                    fechaAplicacion: new Date(),
                    estado: false
                }
            }
        }).then(result => {
            io.emit(req.params.idCompany, {
                idPublicacion: req.body.idPublicacion,
                titulo: req.body.titulo,
                fechaAplicacion: new Date()
            });
            res.send(result);
            res.end();
        }).catch(error => {
            res.send(error);
            res.end();
        })
    })

// Cambiar estado de notificaciones a leídas
router.post('/notifications/read/:idUser', function(req, res) {
    usuarios.updateMany({
        _id: req.params.idUser
    }, {
        $set: {
            "notificaciones.$[].estado": true
        }
    }).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    })
})

/* Enviar correo electrónico de verificación a usuario que se acaba de registrar */
router.post('/verifyemail', function(req, res) {
    let correo = req.body;
    email(correo);
    res.status(200).send();
    res.end();
});

/* Para sección de admins */

/* Obtener todos los admins */

router.get('/admin/all', function(req, res) {
    usuario.find({
        tipoUsuario: 2
    }, {}).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

/* Obtener todos los empresas */
router.get('/admin/companies/all', function(req, res) {
    usuario.find({
        tipoUsuario: 1
    }, {}).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

/* Obtener todos los empleados */
router.get('/admin/employees/all', function(req, res) {
    usuario.find({
        tipoUsuario: 0
    }, {}).then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});


/* Registro de admins */
router.post('/admin/newAdmin', async function(req, res) {
    const correo = req.body.rgCorreo;
    const hash = await bcrypt.hashSync(req.body.rgPassword, 10)
    const user = await usuario.findOne({ 'correo': correo });

    if (user != null) {
        return res.status(401).json({ "message": "Correo en uso" });
    }

    let userRouter = new usuario({
        nombreCompleto: req.body.rgNombre,
        correo: req.body.rgCorreo,
        password: hash,
        profesion: [],
        tipoUsuario: 2, //Usuario: 0, Empresa: 1, Administrador: 2
        fechaNacimiento: null,
        genero: 1, //Masculino: 1, Femenino: 0
        rating: [], //{pais: '', departamento: '', ciudad: ''}
        curriculum: [], //[{idCV: '', nombreCV: '', fechaCreacion: ''}]    
        fotoPerfil: '',
        medioPago: [],
        sucursales: [],
        rubros: [],
        fechaFundacion: null,
        notificaciones: [],
        estado : 'activo'
    });

    userRouter.save().then( () => {
        res.status(200).json({message : 'Nuevo administrador agregado correctamente.'});
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

/* Actualizar estado */

router.put('/admin/updateStatus/:idUser', function (req, res){
    usuario.updateOne({
        _id : req.params.idUser
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

/* Actualiza información de admin */
router.post('/admin/updateInfo/:idUser', async function(req, res) {
    const correo = req.body.rgCorreo;
    const hash = await bcrypt.hashSync(req.body.rgPassword, 10)
    const user = await usuario.findOne({ 'correo': correo });

    if (user != null) {
        return res.status(401).json({ "message": "Correo en uso" });
    }

    usuario.updateOne(
        {
            _id : req.params.idUser
        },
        {
            nombreCompleto : req.body.rgNombre,
            correo : req.body.rgCorreo,
            password : hash
        }).then( () => {
            res.status(200).json({message: "Datos actualizados correctamente"});
            res.end()
        }).catch( error => {
            res.send(error);
            res.end();
        })


});

//seguir una compania
router.post('/followCompany/:idUser', async(req, res)=>{
    const user = await usuario.findOne({ '_id': req.body.idCompany })
    if(user.seguidores.indexOf(req.params.idUser)!=-1){
        res.status(200).json({message: "ya esta siguiendo a la compania"});
        res.end()
    }else{
        
        await usuario.updateOne(
            {
                _id:mongoose.Types.ObjectId(req.params.idUser)
            },{
                $push:{
                    "siguiendo":req.body.idCompany
                }
            }

        );
        await usuario.updateOne(
            {
                _id:mongoose.Types.ObjectId(req.body.idCompany)
            },    
            {
                $push:{
                    "seguidores":req.params.idUser
                
                }
            }
        );
        res.status(200).json({message: "se activo seguir la empresa"});
            res.end()
    }
    
});

//dejar de seguir una compania
router.post('/StopfollowCompany/:idUser', async(req, res)=>{
    const user = await usuario.findOne({ '_id': req.body.idCompany })
    if(user.seguidores.indexOf(req.params.idUser)==-1){
        res.status(200).json({message: "no se esta siguiendo esta compania"});
        res.end()
    }else{
        
        await usuario.updateOne(
            {
                _id:mongoose.Types.ObjectId(req.params.idUser)
            },{
                $pull:{
                    "siguiendo":req.body.idCompany
                }
            }

        );
        await usuario.updateOne(
            {
                _id:mongoose.Types.ObjectId(req.body.idCompany)
            },    
            {
                $pull:{
                    "seguidores":req.params.idUser
                
                }
            }
        );
        res.status(200).json({message: "se activo dejar de seguir la empresa"});
            res.end()
    }
    
});

//Verificar cuenta
router.post('/verifyAccount/:idUser', function(req, res){
    usuario.updateOne(
        {
            _id : req.params.idUser
        },
        {
            verified : true
        }
    ).then(result => {
        res.send(result);
        res.end();
    }).catch(error =>{
        res.send(error);
        res.end();
    })
})


module.exports = router;