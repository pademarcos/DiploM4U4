var express = require('express');
var router = express.Router();
var usuariosModel = require('./../../models/usuariosModel');

/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout',
  });
});

router.get('/logout', function (req, res, next){
  req.session.destroy();//destruye variables de sesion (id y usuario)
  res.render('admin/login',{
    layout: 'admin/layout'
  });
});

router.post ('/', async (req, res, next) => {
  try{
    var usuario = req.body.usuario;  // pepe /captura informacion de formulario
    var password = req.body.password;// pepe123

    var data = await usuariosModel.getUserByUserNameAndPassword(usuario, password); //lo almacena en data

    if (data != undefined){

      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;
      res.redirect('/admin/novedades');
    } else{
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (err){
    console.log(err);
    res.status(500).send('Error de servidor');
  }
})


module.exports = router;
