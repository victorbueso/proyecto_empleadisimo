const nodemailer = require('nodemailer');

module.exports = info => {
    let access = `http://localhost:4200/verifyaccount/`;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'empleadisimohn@gmail.com',
            pass: 'Febrero+2020'
        }
    });

    const mailOptions = {
        from: `empleadisimohn@gmail.com`,
        to: `${info.correo}`,
        subject: 'Verificación de correo electrónico: Empleadísimo',
        html: `<strong>Email:</strong>${info.correo}<br>
               <strong>Mensaje:</strong>Ingrese a este nuevo enlace para terminar la verificación: ${access}${info.token}/${info.idUser}`
    };

    transporter.sendMail(mailOptions, (error, res) => {
        if(error)
            console.log(error);
        else
            console.log(res);
    });
};