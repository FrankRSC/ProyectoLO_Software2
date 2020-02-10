const imagesCtrl = {};
const pool = require('../models/database');
var fs = require("fs");

//importar el modelo de la base de datos que esta en el archivo aparat
 
//Agregar
imagesCtrl.createimages =  async (req, res) => {
    res.send(req.file)
}

 





module.exports = imagesCtrl;