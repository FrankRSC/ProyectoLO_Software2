const {Router} = require('express');
const router = Router();

const {getMateriales} = require('../controllers/material.controlador');

router.route('/')
    //Obtener Todos los materiales mediante la peticion get
    .get(getMateriales)


module.exports = router;