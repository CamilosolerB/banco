const mysql =require('mysql')//habilita para usar mysql
module.exports=()=>//hace la exportacion de datos
mysql.createConnection({//trae los datos importantes
    host:'en1ehf30yom7txe7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user:'bf6f59xnxbjjmngr',
    password: 'ol0iqr1jzgu5zu66',
    database:'getu19rdqt8dk5nt',
    port:"3306"
})