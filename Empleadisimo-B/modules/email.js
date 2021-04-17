const nodemailer = require('nodemailer');

module.exports = info => {
    let access = `http://localhost:4200/verifyaccount/`;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'empleadisimoprueba@gmail.com',
            pass: 'Febrero+2020'
        }
    });

    const mailOptions = {
        from: `empleadisimohn@gmail.com`,
        to: `${info.correo}`,
        subject: 'Verificación de correo electrónico: Empleadísimo',
        html: `
               <h1>Bienvenido/a a nuestra familia</h1>
               Da click en siguiente enlace para completar la verificación de tu cuenta: <br>
               
               ${access}${info.token}/${info.idUser}`
    };

    transporter.sendMail(mailOptions, (error, res) => {
        if(error)
            console.log(error);
        else
            console.log(res);
    });
};