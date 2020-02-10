const {Router} = require('express');
const router = Router();

const {createimages} = require('../controllers/images.controlador');

router.route('/')

    //Agregar
    .post(createimages);


module.exports = router;