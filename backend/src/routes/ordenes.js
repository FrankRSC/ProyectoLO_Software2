const {Router} = require('express');
const router = Router();

const {getOrdenes, createOrdenes, getOrden,deleteOrdenes,updateOrdenes} = require('../controllers/ordenes.controlador');

router.route('/')
    //Obtener
    .get(getOrdenes)
    //Agregar
    .post(createOrdenes);

router.route('/:id')
    .get(getOrden)
    // //Actualizar algo en el servidor
    .put(updateOrdenes)
    // //Borrar
    .delete(deleteOrdenes);


module.exports = router;