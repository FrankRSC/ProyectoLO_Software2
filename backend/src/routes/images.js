const {Router} = require('express');
const router = Router();

const {createimages} = require('../controllers/images.controlador');

router.route('/')

    //Subir imagenes mediante la peticion post
    .post(createimages);


module.exports = router;