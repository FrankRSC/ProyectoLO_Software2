const express = require('express');
const cors = require('cors');
const multer = require('multer')
const path = require('path')
const app = express();


// settings
app.set('port', process.env.PORT || 3000);

// middlewares
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