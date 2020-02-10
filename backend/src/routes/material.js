const {Router} = require('express');
const router = Router();

const {getMateriales} = require('../controllers/material.controlador');

router.route('/')
    //Obtener
    .get(getMateriales)


module.exports = router;