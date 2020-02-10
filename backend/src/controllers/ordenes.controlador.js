const ordenesCtrl = {};
const pool = require('../models/database');
var fs = require("fs");

//importar el modelo de la base de datos que esta en el archivo aparato

//Obtener
ordenesCtrl.getOrdenes =  async (req, res) => {
    const ordenes = await pool.query('SELECT * FROM Ordenes');
     res.send(ordenes);
}
 
//Agregar
ordenesCtrl.createOrdenes =  async (req, res) => {
    const {Clinica, Paciente, Fecha_salida,Doctor,Fecha_entrada,Trabajo_realizar,Color,Material,Imagen,Observaciones,Estado,clave_cliente} = req.body
    
    const newOrdenes = {
        Clinica:Clinica , 
        Paciente, 
        Fecha_salida,
        Doctor,
        Fecha_entrada,
        Trabajo_realizar,
        Color,
        Material,
        Imagen: fs.readFileSync(Imagen),
        Observaciones,
        Estado,
        clave_cliente
    }
    console.log(newOrdenes);
    await pool.query('INSERT INTO Ordenes set ?', [newOrdenes])
   
    //console.log(req.file)
}

 

ordenesCtrl.getOrden = async (req, res) => {
   
    const a = req.params.id;
    const ordenes = await pool.query('SELECT * FROM Ordenes WHERE Estado =  ?', req.params.id );
    res.send(ordenes)
}

//Actualizar nota
ordenesCtrl.updateOrdenes = async (req, res) => {
       //estoy obteniendo los datos para mandarlos a un formulario
    const {id} = req.params;
    const {Estado} = req.body
    const newOrden = {
        Estado
    }
    await pool.query('UPDATE ORDENES set Estado = ? WHERE Clave_Orden = ?', [Estado,id]);
    
    
}



ordenesCtrl.deleteOrdenes = async (req, res) => {
   const ordenes = await pool.query('DELETE FROM Ordenes WHERE Clave_Orden = ?', [req.params.id]);
   //res.redirect('/')
   res.send(ordenes)
}

module.exports = ordenesCtrl;