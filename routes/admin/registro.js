var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

router.post('/', async (req, res, next) => {
  try {
    var nuevoUsuario = req.body.nuevoUsuario;
    var nuevaContraseña = req.body.nuevaContraseña;
    var confirmarContraseña = req.body.confirmarContraseña;

    if (nuevaContraseña.length < 4) {
      return res.render('admin/login', {
        layout: 'admin/layout',
        error: true,
        errorMessage: 'La contraseña debe tener al menos 4 caracteres.',
      });
    }

    if (nuevaContraseña !== confirmarContraseña) {
      return res.render('admin/login', {
        layout: 'admin/layout',
        error: true,
        errorMessage: 'La contraseña y la confirmación no coinciden.',
      });
    }
    

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