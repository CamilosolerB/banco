const connection=require('../conexion/conexion');
const cnn=connection();
const open=require('open');
const{render}=require('ejs');//habilita la conexion entre ejs porque con html supondria problemas
const bcryptjs=require('bcryptjs');//cuando se crea este metodo hace que la contraseña se encripte incluso si tiene el acceso a la base de datos
const controller={};//habilita lafuncion de crear controladores
controller.index=(req,res,next)=>{
    open(res.render('web'))//abre el login para el inicio
}
controller.logueo=(req,res,next)=>{
    res.render('login')
}
controller.redirigir=(req,res,next)=>{
    res.render('redirigir')
}
controller.redireciona=(req,res,next)=>{
    res.render('nuevoempleado')
}
controller.consultageneral=(req,res,next)=>{
    if(req.session.login){

    
    cnn.query('select * from usuario',(err,resbd)=>{//hace la consulta en MySQL
        if(err){
            next(new Error(err))//busca si existe un erroren la consulta
            console.log("error en la consulta")

        }
        else{
            console.log(resbd)
            res.render('ForUser',{datos:resbd});//si existe datos importa al programa
        }
    })
}
else{
    res.redirect('/')
}
}



controller.insertar=async(req,res,next)=>{//este controlador permite la insercion de un nuevo usuario
    const d=req.body.documento;
    const n=req.body.nombre;
    const c=req.body.clave;
    const r=req.body.rol;
    const e=req.body.estado;
    const i=req.body.imagen;
    //estos son las casillas para el importe de datos
    const password=await bcryptjs.hash(c,8)//usando el modulo bycriptjs hace que la contraseña se encripta cuando se crea
    console.log(d,n);//para cisualizar si se importa algunos datos
    cnn.query('insert INTO usuario SET?',{documento:d,nombre:n,clave:password,rol:r,estado:e,imagen:i}, async(err)=>{//hace la consulta y la inserta en el formulario creado
        if(err){
            console.log(err)//visualizar el error en la consulta
        }
        else{
            //crea el usuario y redirecciona de nuevo al formulario
            res.redirect('consulta')
        }
    })

}


controller.consultageneralcli=(req,res,next)=>{
    if(req.session.login){
    cnn.query('select * from cliente',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("error en la consulta")

        }
        else{
            console.log(resbd)
            res.render('formcliente',{datos:resbd})
        }
    })
}
else{
    res.redirect('/')
}
}
controller.insertarcli=(req,res,next)=>{
    const d=req.body.documentoc;
    const n=req.body.nombrec;
    const a=req.body.apellido;
    const c=req.body.correo;
    const cel=req.body.celular;
    const s=req.body.sexo;
    const nf=req.body.fecha_nacimiento;
    console.log(d,n);
    cnn.query('insert INTO cliente SET?',{documentoc:d,nombrec:n,apellido:a,correo:c,celular:cel,sexo:s,fecha_nacimiento:nf}, async(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.redirect('consultacli');
        }
    })
}

controller.consultageneralcre=(req,res,next)=>{
    if(req.session.login){
    cnn.query('select * from creditos',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("error en la consulta")

        }
        else{
            console.log(resbd)
            res.render('formcredito',{datos:resbd})
        }
    })
}
else{
    res.redirect('/');
}
}

controller.insertarcre=(req,res,next)=>{
    const c=req.body.codigo;
    const d=req.body.documentocre;
    const co=req.body.codlineacre;
    const m=req.body.monto;
    const f=req.body.fecha;
    const p=req.body.plazo;
    console.log(d);
    cnn.query('insert INTO creditos SET?',{codigo:c,documentocre:d,codlineacre:co,monto:m,fecha:f,plazo:p},(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.redirect('consultacre');
        }
    })

}

controller.consultagenerallin=(req,res,next)=>{
    if(req.session.login){
    cnn.query('select * from lineas',(err,resbd)=>{
        if(err){
            next(new Error(err))
            console.log("error en la consulta")

        }
        else{
            console.log(resbd)
            res.render('formlineas',{datos:resbd})
        }
    })
    }
    else{
        res.redirect('/')
    }
}


controller.insertarlin=(req,res,next)=>{
    const co=req.body.codlinea;
    const no=req.body.nomlinea;
    const mo=req.body.montomaximo;
    const pl=req.body.plazomax;
    console.log(co,no,mo,pl);
    cnn.query('insert INTO lineas SET?',{codlinea:co,nomlinea:no,montomaximo:mo,plazomax:pl},(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            res.redirect('consultalin');
        }
    })

}
//consulta individual

controller.login=async(req,res,next)=>{
    const usu=await req.body.nombre;//importa el nombre del usuario
    const cla=await req.body.clave;//importa la clave del usuario
    //inicio de la consulta en MYSQL con la importacion de sus respectivos datos
    cnn.query('SELECT * FROM usuario WHERE nombre=?',[usu],async(err,results)=>{
        //if(results!=0){
            //valida si hay algun usuario disponible con los datos insertados no importa si sus datos estas encriptado o no
           console.log('aaaaaaaaaaaaaaaaaaagria')
        //}
        if(err){
            //valida si existe un error en la consulta o tipeado en la seccion del controlador
            next(new Error("Error en la consulta login",err));
        }
        else if(results!=0 && (bcryptjs.compare(cla,results[0].clave))){
            //Valida si existe un usuario y contraseña aceptada y que esta encriptada
                console.log("Los correctos mi rey");
                //res.redirect('consulta');
                rol= results[0].rol;//hace el array con el rol disponible
                uss=results[0].rol;//hace lo mismo que lo anterior pero para mayor validacion.
                req.session.login=true;//hace la validacion si el session es true 
                switch(rol){
                    case "cliente":
                        //hace la respectiva accion si el usuario es Cliente
                        if(req.session.login){
                            //abre el ejs que dirige al cliente
                            cnn.query('SELECT * from usuario INNER JOIN cliente on (documento=documentoc) INNER JOIN creditos on (documentoc=documentocre) INNER JOIN lineas on (codlineacre=codlinea) WHERE nombre="'+usu+'"',async(err,resbd)=>{
                                if(err){
                                    next(new Error(err))
                                }
                                else{
                                    console.log(resbd)
                                    res.render('forvistindi',{datos:resbd})
                                }
                            })
                            
                        }
                    break;
                    case "admin":
                        //envia al formulario para ver y crear usuarios
                        res.redirect('redirigir')
                    break;
                    case "empleado":
                        res.redirect('redirecciona')
                    break;

                }
        }
        else{
            //si no existe un usuario o sus claves son erroneas sera dirigido aqui
            console.log("Datos incorrectos");
            res.redirect('/');//hace que vuelva al mismo menu
        }
    })
}

//actualizaciones
controller.actualizar=async(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const clax=req.body.cc;
    const rolx=req.body.rr;
    const estx=req.body.ee;
    const imgx=req.body.ii;
    const password=await bcryptjs.hash(clax,8)
    
    cnn.query('UPDATE usuario SET nombre="'+nomx+'",clave="'+password+'",rol="'+rolx+'", estado="'+estx+'",imagen="'+imgx+'" WHERE documento="'+docx+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('consulta')
        }})}

    controller.actualizar=async(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const clax=req.body.cc;
    const rolx=req.body.rr;
    const estx=req.body.ee;
    const imgx=req.body.ii;
    const password=await bcryptjs.hash(clax,8)
    
    cnn.query('UPDATE usuario SET nombre="'+nomx+'",clave="'+password+'",rol="'+rolx+'", estado="'+estx+'",imagen="'+imgx+'" WHERE documento="'+docx+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Actualizado")
          res.redirect('consulta')
        }})}
        controller.actualizarcli=(req,res,next)=>{
            const docx=req.body.dd;
            const nomx=req.body.nn;
            const apex=req.body.aa;
            const corx=req.body.cc;
            const celx=req.body.cece;
            const sexx=req.body.ss;
            const fecnac=req.body.ff;
            
            cnn.query('UPDATE cliente SET nombrec="'+nomx+'",apellido="'+apex+'",correo="'+corx+'", celular="'+celx+'",sexo="'+sexx+'", fecha_nacimiento="'+fecnac+'" WHERE documentoc="'+docx+'"', async(err,respbb)=>{
              if(err){
                  next(new Error(err));
              }
              else{
                  console.log("Actualizado")
                  res.redirect('/consultacli')
                }})}
        controller.actualizarcre=(req,res,next)=>{
            const codx=req.body.cc;
            const docx=req.body.dd;
            const codlx=req.body.clcl;
            const monx=req.body.mm;
            const fecx=req.body.ff;
            const plax=req.body.pp;
            
            cnn.query('UPDATE creditos SET documentocre="'+docx+'",codlineacre="'+codlx+'",monto="'+monx+'", fecha="'+fecx+'",plazo="'+plax+'" WHERE codigo="'+codx+'"', async(err,respbb)=>{
              if(err){
                  next(new Error(err));
              }
              else{
                  console.log("Actualizado")
                  res.redirect('consultacre')
                }})}
//actualizar lineas
controller.actualizarli=(req,res,next)=>{
    const codx=req.body.cc;
    const nomx=req.body.nn;
    const monx=req.body.mm;
    const plax=req.body.pp;
                    
    cnn.query('UPDATE lineas SET nomlinea="'+nomx+'",montomaximo="'+monx+'",plazomax="'+plax+'" WHERE codlinea="'+codx+'"', async(err,respbb)=>{
    if(err){
        next(new Error(err));
    }
    else{
        console.log("Actualizado")
        res.redirect('consultalin')
    }
}
)
}


//actualizacion individual
controller.individual=async(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const clax=req.body.cc;
    const rolx=req.body.rr;
    const estx=req.body.ee;
    const imgx=req.body.ii;
    const password=await bcryptjs.hash(clax,8)
    
    cnn.query('UPDATE usuario SET nombre="'+nomx+'",clave="'+password+'",rol="'+rolx+'", estado="'+estx+'",imagen="'+imgx+'" WHERE documento="'+docx+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
          console.log("Usuario actualizado");
          res.redirect('/somos')
        }})
}
controller.individualcli=(req,res,next)=>{
    const docx=req.body.dd;
    const nomx=req.body.nn;
    const apex=req.body.aa;
    const corx=req.body.cc;
    const celx=req.body.cece;
    const sexx=req.body.ss;
    const fecnac=req.body.ff;
            
    cnn.query('UPDATE cliente SET nombrec="'+nomx+'",apellido="'+apex+'",correo="'+corx+'", celular="'+celx+'",sexo="'+sexx+'", fecha_nacimiento="'+fecnac+'" WHERE documentoc="'+docx+'"', async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("Cliente actualizado")
            res.redirect
        }})
}



//borrar
controller.borrarusu=(req,res,next)=>{
    const docx=req.body.dd;
    cnn.query('DELETE FROM usuario WHERE documento="'+docx+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
          console.log("eliminado")
          res.redirect('consulta')
        }})

}
controller.borrarcli=(req,res,next)=>{
    const docx=req.body.dd;
    cnn.query('DELETE FROM clientes WHERE documento="'+docx+'"', async(err,respbb)=>{
      if(err){
          next(new Error(err));
      }
      else{
          console.log("eliminado")
          res.redirect('consultacli')
        }})
}
controller.borrarlin=(req,res,next)=>{
    const codx=req.body.cc;
    cnn.query('DELETE FROM lineas WHERE codlinea="'+codx+'"', async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("eliminado")
            res.redirect('consultalin')
          }})
}
controller.borrarcre=(req,res,next)=>{
    const codx=req.body.cc;
    cnn.query('DELETE FROM creditos WHERE codlinea="'+codx+'"', async(err,respbb)=>{
        if(err){
            next(new Error(err));
        }
        else{
            console.log("eliminado")
            res.redirect('consultalin')
          }})
}
controller.pasar=(req,res,next)=>{
    const docu = req.body.doc;
    const mon =req.body.monto;
    const mid = req.body.midoc;

    cnn.query('UPDATE creditos SET monto=("'+mon+'"+monto) WHERE documentocre="'+docu+'"',(err,resbb)=>{
        if(err){
            next(new Error(err))
        }
        else{
            cnn.query('UPDATE creditos SET monto=(monto-"'+mon+'") WHERE documentocre="'+mid+'"',(err)=>{
                if(err){
                    next(new Error(err))
                }
                else{
                    console.log("Transferecia exitosa")
                    res.redirect('logueo')
                }
            })
        }
    })
}
controller.retirar=(req,res,next)=>{

    const docu = req.body.doc;
    const mon =req.body.monto;

    cnn.query('UPDATE creditos SET monto=(monto-"'+mon+'") WHERE documentocre="'+docu+'"',(err)=>{
        if(err){
            next(new Error(err))
        }
        else{
            console.log("Transferecia exitosa")
            res.redirect('logueo')
        }
    })

}






controller.cerrar=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/logueo')
    })
}
module.exports=controller;//exporta el modulo para que sea capturado especificamente en las rutas