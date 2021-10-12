const mysql =require('mysql')//habilita para usar mysql
module.exports=()=>//hace la exportacion de datos
mysql.createConnection({//trae los datos importantes
    host:'localhost',
    user:'root',
    password: '',
    database:'banco'
})