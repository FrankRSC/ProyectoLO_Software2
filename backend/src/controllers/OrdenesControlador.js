const ordenesCtrl = {};
const pool = require('../models/Database');
var fs = require("fs");


//Obtener Ordenes mediante query
ordenesCtrl.getOrdenes =  async (req, res) => {
    const ordenes = await pool.query('SELECT * FROM Ordenes');
     res.send(ordenes);
}
 
//Agregar a la base de datos mediante query
ordenesCtrl.createOrdenes =  async (req, res) => {

    const 
    {
        Clinica, 
        Paciente, 
        Fecha_salida,
        Doctor,
        Fecha_entrada,
        Trabajo_realizar,
        Color,
        Material,
        Imagen,
        Observaciones,
        Estado,clave_cliente
    } = req.body
    
    const newOrden = {
        Clinica:Clinica , Paciente, Fecha_salida,Doctor,Fecha_entrada,Trabajo_realizar, Color, Material,
        //Con el fs se busca la imagen que se solicitud y la agrega a la bd
        Imagen: fs.readFileSync(Imagen),
        Observaciones,Estado,clave_cliente
    }
    await pool.query('INSERT INTO Ordenes set ?', [newOrden])
}

 
//Obtener una orden por ID
ordenesCtrl.getOrden = async (req, res) => {
   
    const ordenes = await pool.query('SELECT * FROM Ordenes WHERE Estado =  ?', req.params.id );
    res.send(ordenes)
}

//Actualizar las ordenes de trabajo, solo se actualiza su estado
ordenesCtrl.updateOrdenes = async (req, res) => {
       //estoy obteniendo los datos para mandarlos a un formulario
    const {id} = req.params;
    const {Estado} = req.body
  
    await pool.query('UPDATE ORDENES set Estado = ? WHERE Clave_Orden = ?', [Estado,id]);
    
    
}


//Borrar ordenes de trabajo
ordenesCtrl.deleteOrdenes = async (req, res) => {
   const ordenes = await pool.query('DELETE FROM Ordenes WHERE Clave_Orden = ?', [req.params.id]);
   //res.redirect('/')
   res.send(ordenes)
}

module.exports = ordenesCtrl;