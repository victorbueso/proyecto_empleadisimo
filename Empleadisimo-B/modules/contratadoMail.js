const nodemailer = require('nodemailer');

module.exports = info => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'empleadisimoprueba@gmail.com',
            pass: 'Febrero+2020'
        }
    });

    const mailOptions = {
        from: `empleadisimoprueba@gmail.com`,
        to: `${info.correo}`,
        subject: '¡Has sido contratado/a!',
        html: `<h1>Hola, ${info.nombre}</h1>
               <p>Nos complace notificarte que la empresa <strong> ${info.empresa} </strong> te ha seleccionado para el puesto de: </p>
               <h3>${info.tituloPublicacion}</h3>
               <p>Pronto se pondrán en contacto contigo para indicarte los siguientes pasos</p>
               <br>
               <p>Te deseamos muchos éxitos en tu vida laboral <br>
               <span>Atte. El equipo de Empleadísimo</span>
               </p> 
               `
    };

    transporter.sendMail(mailOptions, (error, res) => {
        if(error)
            console.log(error);
        else
            console.log(res);
    });
};