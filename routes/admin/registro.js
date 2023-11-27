var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');
const md5 = require('md5');

router.post('/', async (req, res, next) => {
  try {
    var nuevoUsuario = req.body.nuevoUsuario;
    var nuevaContraseña = md5(req.body.nuevaContraseña);

    // Lógica para registrar en la base de datos
    await usuariosModel.insertUsuario({
      usuario: nuevoUsuario,
      password: nuevaContraseña,
    });

    // Redirige al inicio de sesión después del registro
    res.redirect('/admin/login');
  } catch (err) {
    console.log(err);
    res.status(500).send('Error de servidor');
  }
});

module.exports = router;