const {Router} = require('express');
const router = Router();

const {getUsuarios,getUsuariobyid, createUsuario, getUsuario,deleteUsuario,updateUsuario} = require('../controllers/UsuarioControlador');

router.route('/')
    //utilizando el metodo get para hacer una peticion de obtencion del servidor
    .get(getUsuarios)
    //Utilizando el metodo post para la solicitar agregar un usuario
    .post(createUsuario);

router.route('/:id')
    //utilizando el metodo get para hacer una peticion de obtencion del servidor por una caracteristica definida
    .get(getUsuario)
    
    
    //Actualizar un usuario por su id
    .put(updateUsuario)
    //Borrar un usuario por su id
    .delete(deleteUsuario);


module.exports = router;