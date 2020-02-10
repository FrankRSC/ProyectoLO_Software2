const materialCtrl = {};
const pool = require('../models/database');
//importar el modelo de la base de datos que esta en el archivo aparato



//Obtener
materialCtrl.getMateriales =  async (req, res) => {
    const materiales = await pool.query('SELECT * FROM MATERIAL');
     res.send(materiales);
}


module.exports = materialCtrl;