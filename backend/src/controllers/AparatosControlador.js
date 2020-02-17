const aparatoCtrl = {};
const pool = require('../models/Database');


//Obtener todos los aparatos de la bd
aparatoCtrl.getAparatos =  async (req, res) => {
    const aparatos = await pool.query('SELECT * FROM APARATOS');
     res.send(aparatos);
}

//Agregar a la bd mediante query
aparatoCtrl.createAparato =  async (req, res) => {
    const {Titulo, Descripcion, Imagen} = req.body
    const newAparato = {
        Titulo, 
        Descripcion, 
        Imagen
    }
    await pool.query('INSERT INTO APARATOS set ?', [newAparato])

}

//Eliminar todos los aparatos
aparatoCtrl.deleteAparato = async (req, res) => {
   const aparato = await pool.query('DELETE FROM APARATOS WHERE clave_foto = ?', [req.params.id]);
   //res.redirect('/')
   res.send(aparato)
}

module.exports = aparatoCtrl;