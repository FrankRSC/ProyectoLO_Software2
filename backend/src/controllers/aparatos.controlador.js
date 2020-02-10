const aparatoCtrl = {};
const pool = require('../models/database');
//importar el modelo de la base de datos que esta en el archivo aparato



//Obtener
aparatoCtrl.getAparatos =  async (req, res) => {
    const aparatos = await pool.query('SELECT * FROM APARATOS');
     res.send(aparatos);
}

//Agregar
aparatoCtrl.createAparato =  async (req, res) => {
    const {Titulo, Descripcion, Imagen} = req.body
    const newAparato = {
        Titulo, 
        Descripcion, 
        Imagen
    }
    await pool.query('INSERT INTO APARATOS set ?', [newAparato])
    console.log(newAparato);
    res.send('adasdadad')
}

 

// aparatoCtrl.getAparato = async (req, res) => {
   
//     const a = req.params.id;
//     console.log(a);
//     const aparat = await pool.query('SELECT * FROM APARATOS WHERE corre =  ?', req.params.id );
//     console.log(cliente);
//     res.send(cliente)
// }

//Actualizar nota
// aparatoCtrl.updateAparato = async (req, res) => {
//     //estoy obteniendo los datos para mandarlos a un formulario
//     const cliente = await pool.query('SELECT * FROM cliente WHERE clave_cliente = ?', [req.params.id]);
//     res.send('adasdadad')
// }



aparatoCtrl.deleteAparato = async (req, res) => {
   const aparato = await pool.query('DELETE FROM APARATOS WHERE clave_foto = ?', [req.params.id]);
   //res.redirect('/')
   res.send(aparato)
}

module.exports = aparatoCtrl;