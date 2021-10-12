$(document).ready(function(){

    $('.btnact2').on('click',function(){
        

        let btn=$('.btnact').index(this);
        let documento=$('.documentoc').eq(btn);
        let nombre=$('.nombrec').eq(btn);
        let apellido=$('.apellido').eq(btn);
        let correo=$('.correo').eq(btn);
        let celular=$('.celular').eq(btn);
        let sexo=$('.sexo').eq(btn);
        let fecha_nacimiento=$('.fecha_nacimiento').eq(btn);

    
        alert(btn)
        let d=documento.val();
        alert(d)
        let n=nombre.val();
        let a=apellido.val();
        let c=correo.val();
        let cel=celular.val();
        let s=sexo.val();
        let f=fecha_nacimiento.val();
    
        alert(d+n+a+c+cel+s+f)

        $.ajax({
        
            type:"POST",
            url:"/indicliente",
            data:{
                dd:d,nn:n,aa:a,cc:c,cece:cel,ss:s,ff:f
            }
        })
    })


    $('.btnact1').on('click',function(){
    

        let btn=$('.btnact').index(this);
        let documento=$('.documento').eq(btn);
        let nombre=$('.nombre').eq(btn);
        let clave=$('.clave').eq(btn);
        let rol=$('.rol').eq(btn);
        let estado=$('.estado').eq(btn);
        let imagen=$('.imagen').eq(btn)
    
    
        let d=documento.val();
        let n=nombre.val();
        let c=clave.val();
        let r=rol.val();
        let e=estado.val();
        let i=imagen.val();
    
        alert(d+"\n"+n+"\n"+c+"\n"+r+"\n"+e+"\n"+i)
    
        $.ajax({
        
            type:"POST",
            url:"/actualizarindi",
            data:{
                dd:d,nn:n,cc:c,rr:r,ee:e,ii:i
            }
        })
    
    
    })
})