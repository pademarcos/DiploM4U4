var pool = require('./bd');
var md5 = require('md5');

async function getUserByUserNameAndPassword(user, password){
    try{
        var query = 'select * from usuarios where usuario = ? and password = ? limit 1';
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];

    } catch (error){
        console.log("Error al obtener el usuario", error);
    }
}

async function insertUsuario(usuario) {
    try {
      var query = 'INSERT INTO usuarios (usuario, password) VALUES (?, ?)';
      await pool.query(query, [usuario.usuario, usuario.password]);
    } catch (error) {
      console.log("Error al insertar el usuario", error);
      throw error; // Reenviar el error para manejarlo en la ruta
    }
  }
  
  module.exports = { getUserByUserNameAndPassword, insertUsuario };