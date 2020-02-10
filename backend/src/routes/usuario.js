const {Router} = require('express');
const router = Router();

const {getUsuarios,getUsuariobyid, createUsuario, getUsuario,deleteUsuario,updateUsuario} = require('../controllers/usuario.controlador');

router.route('/')
    //Obtener
    .get(getUsuarios)
    //Agregar
    .post(createUsuario);

router.route('/:id')
    
    .get(getUsuario)
    
    
    //Actualizar algo en el servidor
    .put(updateUsuario)
    //Borrar
    .delete(deleteUsuario);


module.exports = router;