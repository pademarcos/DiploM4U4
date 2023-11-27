var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
var novedadesModel = require('./../models/novedadesModel')

router.get('/novedades', async function (req, res, next) {
    var novedades = await novedadesModel.getNovedades();
    res.send({
        novedades
    })
    
  });


router.post('/contacto', async(req, res) => {
    const mail = {
        to: 'pademarcos@gmail.com',
        subject: 'Contacto Web',
        html: `${req.body.nombre} se conecto atravez de la web y quiere mas informacion a este correo: ${req.body.email} <br> Además hizo el siguiente comentario: ${req.body.mensaje} <br>Su tel es:${req.body.telefono}` 
    }

    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
    await transport.sendMail(mail)

    res.status(201).json({
        error: false,
        message: "Mensaje enviado"
    });
});

module.exports = router;