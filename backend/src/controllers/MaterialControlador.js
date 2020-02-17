const materialCtrl = {};
const pool = require('../models/database');


//Obtener toda la lista de materiales
materialCtrl.getMateriales =  async (req, res) => {
    const materiales = await pool.query('SELECT * FROM MATERIAL');
     res.send(materiales);
}


module.exports = materialCtrl;