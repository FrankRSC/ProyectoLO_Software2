//Modules que se requieren

//Modulo para la creacion de un servidor y hacer peticciones http al servidor
const express = require('express');

//Modulos para la manipulacion de archivos subidos del lado del cliente
const cors = require('cors');
const multer = require('multer')

//Module procedente de node para la creacion de rutas
const path = require('path')

const app = express();


// settings(configuracion del puerto en el que se va abrir de forma local el servidor)
app.set('port', process.env.PORT || 3000);

// middlewares
//(Intermediarios para la solicitud de peticiones en este caso son para la subida de archivos)
app.use(cors());
app.use(express.json());
app.use(multer({
    dest: path.join(__dirname,  'public/uploads')
}).single('image'))


// routes
app.use('/api/usuarios', require('./routes/usuario'))
app.use('/api/usuariosid', require('./routes/usuariosid'))
app.use('/api/aparatos', require('./routes/aparatos'))
app.use('/api/ordenes', require('./routes/ordenes'))
app.use('/api/images', require('./routes/images'))
app.use('/api/material', require('./routes/material'))


module.exports = app;