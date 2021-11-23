const mysql =require('mysql')//habilita para usar mysql
module.exports=()=>//hace la exportacion de datos
mysql.createConnection({//trae los datos importantes
    host:'b4wvpgbs0pfdzjvlqp7r-mysql.services.clever-cloud.com',
    user:'uy0dnfdgmkd1uctz',
    password: 'EQ9OIHZNY1UYe1Nl87uk',
    database:'b4wvpgbs0pfdzjvlqp7r',
    port:"3306"
})