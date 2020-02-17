const usuarioCtrl = {};
const pool = require('../models/Database');

//Mediante un query solicitar todos los clientes a la base de datos
usuarioCtrl.getUsuarios =  async (req, res) => {
    const clientes = await pool.query('SELECT * FROM CLIENTE');
     res.send(clientes);
     console.log('Usuarios desplegados correctamente')
}

//Mediante query insertar en la base de datos con los parametros que se pasaron
usuarioCtrl.createUsuario =  async (req, res) => {
    const {nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña} = req.body
    const newCliente = {
        nombre, apellidoP, apellidoF, direccion, telefono,corre, contraseña
    }
    await pool.query('INSERT INTO CLIENTE set ?', [newCliente])
    res.redirect('/usuarios')
}

 

//Obtener un usuario mediante el correo
usuarioCtrl.getUsuario = async (req, res) => {
    const cliente = await pool.query('SELECT * FROM CLIENTE WHERE corre =  ?', req.params.id );
    res.send(cliente)
}

//Obtener un usuario por medio de si id
usuarioCtrl.getUsuariobyid = async (req, res) => { 
    const cliente = await pool.query('SELECT * FROM ORDENES WHERE clave_cliente =  ?', req.params.id );
    res.send(cliente)
}

//Actualizar Usuario
usuarioCtrl.updateUsuario = async (req, res) => {
    //estoy obteniendo los datos para mandarlos a un formulario
    const {id} = req.params;
    const {nombre, apellidoP, apellidoF, direccion, telefono, corre, contraseña} = req.body
    const newCliente = {
        nombre, apellidoP, apellidoF, direccion, telefono,corre, contraseña
    }
    console.log(newCliente);
    await pool.query('UPDATE CLIENTE set ? WHERE clave_cliente = ?', [newCliente,id]);

    //Refrescando la ruta de usuarios para visualizar cambios aplicados
    res.redirect('/usuarios')
}


//OEliminar usuario por id
usuarioCtrl.deleteUsuario = async (req, res) => {
   const cliente = await pool.query('DELETE FROM cliente WHERE clave_cliente = ?', [req.params.id]);
   res.send(cliente)
}

module.exports = usuarioCtrl;