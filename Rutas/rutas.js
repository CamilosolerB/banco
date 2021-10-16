//const open=require('open')
const express=require('express');//importa el metodo express
const controller=require('../controlador/controller');//hace el llamado e¡de la exportacion
const rutas=express.Router();

//abre los controladores desarrollados obviamente si estan creados o no
rutas.get('/',controller.index);//abre la pagina principal
rutas.get('/logueo',controller.logueo);
rutas.get('/redirigir',controller.redirigir);
rutas.get('/redirecciona',controller.redireciona);
rutas.get('/consulta',controller.consultageneral);//abre el registro del formulario de usuario
rutas.get('/consultacli',controller.consultageneralcli);
rutas.get('/consultacre',controller.consultageneralcre);
rutas.get('/consultalin',controller.consultagenerallin);
rutas.post('/login',controller.login);//hace la validacion del login
rutas.post('/frminsertar',controller.insertar);//inserta un dato creado a la base de datos
rutas.post('/inscli',controller.insertarcli);
rutas.post('/credins',controller.insertarcre);
rutas.post('/inslin',controller.insertarlin);
//rutas.get('/cliente',controller.Cliente);//abre el formulario cliente
rutas.post('/actualizar',controller.actualizar);//hace la actualizacion de datos
rutas.post('/actualizarcli',controller.actualizarcli)
rutas.post('/actualizarcre',controller.actualizarcre);
rutas.post('/actualizarli',controller.actualizarli);
rutas.post('/actualizarindi',controller.individual);
rutas.post('/indicliente',controller.individualcli);
//borrado
rutas.post('/borrarusu',controller.borrarusu);
rutas.post('/borrarcli',controller.borrarcli);
rutas.post('/borrarlin',controller.borrarlin);
rutas.post('/borrarcre',controller.borrarcre);
//transferencias
rutas.post('/pasar',controller.pasar)
rutas.post('/retirar',controller.retirar);

rutas.get('/cerrar',controller.cerrar);
module.exports=rutas;