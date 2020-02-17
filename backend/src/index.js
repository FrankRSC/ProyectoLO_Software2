//Modulo para que el servidor se este refrescando cada vez
//que exsita un cambio en el codigo
require('dotenv').config();

const app = require('./app')
require('./models/database');

//Creacion del servidor
async function main(){
    await app.listen(app.get('port'));
    console.log('Server on port ', app.get('port'));
}

main();
