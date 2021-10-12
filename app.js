const express=require('express')//importa el modulo para acortar y no tener que escribir la raiz completa
const morgan=require("morgan")//este modulo hace que usando el comando npm run dev se actualiza automaticamente sin necesidad de escribir node....
const app=express();//habilita el uso de expres
const path=require('path');//hace complemento con el modulo express
const bcryptjs=require('bcryptjs');//modulo que hace que las contraseñas se encripten
const { connect } = require('./Rutas/rutas');
const session=require('express-session');//importa el modulo para que se habiliten las sesiones y no se extienda el codigo
app.use(morgan("dev"));//usando morgan usan la opcion dev para la actualizar automatiamente si cambia por ejemplo a "reload" seria el comando npm run reload
app.use(express.static(path.join(__dirname,'public')));//usando express habilita a la carpeta public como un path
app.set('view engine','ejs');//habilita para que se pueda trabajar con archivos ejs y no con html
app.set('views',path.join(__dirname,'vista'));//usando express habilita a la carpeta vista como un path

app.use(//cuando se habilita la linea 7 node requiere traer una serie de complementospara las sesiones
    session({
    secret:'123',
    resave:true,
    saveUninitialized:true
}))


app.use(express.urlencoded({extended:true}));
app.use(require("./Rutas/rutas"));//permite el uso de la carpeta rutas
app.use=((err,req,res,next)=>{
    res.send({err:err.message});//si existe error en el app lo muestra
});

/*const http=require("http");
const server=http.createServer((req,res)=>{
    console.log("En conexion")
    res.end("conexion ok")
})

server.listen(3000,()=>{
    console.log("Esperando respuesta")
})*/


//servidor
app.set("port",process.env.PORT || 3000);//habilita el uso del servidor


app.listen(app.get("port"),()=>{
    console.log(`en el servidor ${app.get("port")}`);
})