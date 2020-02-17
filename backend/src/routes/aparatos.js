const {Router} = require('express');
const router = Router();

const {getAparatos, createAparato, getAparato,deleteAparato,updateAparato} = require('../controllers/AparatosControlador');

router.route('/')
    //Obtener
    .get(getAparatos)
    //Agregar
    .post(createAparato);

router.route('/:id')
    // //Borrar
    .delete(deleteAparato);


module.exports = router;