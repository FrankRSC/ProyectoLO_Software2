const imagesCtrl = {};
const pool = require('../models/database');
var fs = require("fs");
 
//Agregar imagenes a la base de datos
imagesCtrl.createimages =  async (req, res) => {
    res.send(req.file)
}

 
module.exports = imagesCtrl;