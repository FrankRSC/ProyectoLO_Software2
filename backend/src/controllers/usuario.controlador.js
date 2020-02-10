const usuarioCtrl = {};
const pool = require('../models/database');
//importar el modelo de la base de datos que esta en el archivo Usuario



//Obtener
usuarioCtrl.getUsuarios =  async (req, res) => {
    const clientes = await pool.query('SELECT * FROM CLIENTE');
     res.send(clientes);
     console.log('Usuarios desplegados correctamentgggggggggggggge')
}

//Agregar
usuarioCtrl.createUsuario =  async (req, res) => {
    const {nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña} = req.body
    const newCliente = {
        nombre, 
        apellidoP, 
        apellidoF, 
        direccion, 
        telefono,
        corre, 
        contraseña
    }
    await pool.query('INSERT INTO CLIENTE set ?', [newCliente])
    res.redirect('/usuarios')
}

 

usuarioCtrl.getUsuario = async (req, res) => {
   
    const a = req.params.id;
    console.log(a);
    const cliente = await pool.query('SELECT * FROM CLIENTE WHERE corre =  ?', req.params.id );
    console.log(cliente);
    res.send(cliente)
}

usuarioCtrl.getUsuariobyid = async (req, res) => {
   
    const a = req.params.id;
    console.log(a);
    const cliente = await pool.query('SELECT * FROM ORDENES WHERE clave_cliente =  ?', req.params.id );
    console.log(cliente);
    res.send(cliente)
}

//Actualizar nota
usuarioCtrl.updateUsuario = async (req, res) => {
    //estoy obteniendo los datos para mandarlos a un formulario
    const {id} = req.params;
    const {nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña} = req.body
    const newCliente = {
        nombre, 
        apellidoP, 
        apellidoF, 
        direccion, 
        telefono,
        corre, 
        contraseña
    }
    console.log(newCliente);
    const cliente = await pool.query('UPDATE CLIENTE set ? WHERE clave_cliente = ?', [newCliente,id]);
    //res.send(cliente)
    res.redirect('/usuarios')
}



usuarioCtrl.deleteUsuario = async (req, res) => {
   const cliente = await pool.query('DELETE FROM cliente WHERE clave_cliente = ?', [req.params.id]);
   //res.redirect('/')
   res.send(cliente)
}

module.exports = usuarioCtrl;