const {Router} = require('express');
const router = Router();

const {getOrdenes, createOrdenes, getOrden,deleteOrdenes,updateOrdenes} = require('../controllers/ordenes.controlador');

router.route('/')
    //Hacer una solictud get para obtener todas las ordenes
    .get(getOrdenes)
    //Hacer una peticion post para crear las ordenes
    .post(createOrdenes);

router.route('/:id')

    //Hacer una peticion get para obtener un sola orden dependiendo del parametro pasado
    .get(getOrden)
    //Hacer una peticion put para actualizar una orden dependiendo del paramatero
    .put(updateOrdenes)
    //Borrar una orden
    .delete(deleteOrdenes);


module.exports = router;