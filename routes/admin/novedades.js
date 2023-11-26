var express = require("express");
var router = express.Router();
var novedadesModel = require('./../../models/novedadesModel')

/* GET login page. */
router.get('/', async function (req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('admin/novedades', {
    layout: 'admin/layout',
    persona: req.session.nombre,
    novedades
  });
});

router.get('/agregar', (req, res, next) => {
  res.render('admin/agregar', {
    layout: 'admin/layout'
});
});

router.post('/agregar', async (req, res, next) =>{
  try{
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
      await novedadesModel.insertNovedades(req.body);
      res.redirect('/admin/novedades')
    } else {
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: "Todos los campos son obligatorios"
      })
    }
    } catch(e){
      console.log(e);
      res.render('admin/agregar', {
        layout: 'admin/layout',
        error: true, message: "Error al agregar la novedad"
      });
    }
});

router.get('/modificar/:id', async (req, res, next) => {
  let id = req.params.id;
  let novedad = await novedadesModel.getNovedadById(id);
  res.render('admin/modificar', {
    layout: 'admin/layout',
    novedad
  });
});

router.post('/modificar', async (req, res, next) => {
  try{
    let obj ={
      titulo : req.body.titulo,
      subtitulo : req.body.subtitulo,
      cuerpo : req.body.cuerpo
    }

    await novedadesModel.modficarNovedadById(obj, req.body.id);
    res.redirect('/admin/novedades');
    }catch(e){
      console.log(e);
      res.render('admin/modificar', {
        layout: 'admin/layout',
        error: true, 
        message: "Error al modificar la novedad"
      })
    }
})

router.get('/borrar/:id', async (req, res, next) => {
  try {
    let id = req.params.id;
    await novedadesModel.borrarNovedadById(id);
    res.redirect('/admin/novedades');
  } catch (e) {
    console.log(e);
    res.render('admin/novedades', {
      layout: 'admin/layout',
      error: true,
      message: "Error al borrar la novedad"
    });
  }
});



module.exports = router;