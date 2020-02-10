const {Router} = require('express');
const router = Router();

const {getAparatos, createAparato, getAparato,deleteAparato,updateAparato} = require('../controllers/aparatos.controlador');

router.route('/')
    //Obtener
    .get(getAparatos)
    //Agregar
    .post(createAparato);

router.route('/:id')
    // .get(getAparato)
    // //Actualizar algo en el servidor
    // .put(updateAparato)
    // //Borrar
    .delete(deleteAparato);


module.exports = router;