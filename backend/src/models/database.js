//Modulo para la utilizacion de mysql
const mysql = require('mysql');

//Solicitando las credenciales del archivo keys
const {database} = require('./Keys');
//modulo en caso de que devuelva un error marcarlo
const {promisify} =  require('util')

//Uso de las credenciasles para la conexion con la base de datos
//Si ocurre un error, ocurrir los siguientes mensajes
const pool =  mysql.createPool(database);
pool.getConnection((err, connection) =>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code == 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code == 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) connection.release();
    console.log('DB is Connected')
    return;
});

pool.query = promisify(pool.query);


module.exports = pool;