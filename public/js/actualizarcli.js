$(document).ready(function(){

    $('.btnact').on('click',function(){
        

        let btn=$('.btnact').index(this);
        let documento=$('.documentoc').eq(btn);
        let nombre=$('.nombrec').eq(btn);
        let apellido=$('.apellido').eq(btn);
        let correo=$('.correo').eq(btn);
        let celular=$('.celular').eq(btn);
        let sexo=$('.sexo').eq(btn);
        let fecha_nacimiento=$('.fecha_nacimiento').eq(btn);

        let d=documento.val();
        let n=nombre.val();

        let a=apellido.val();
        let c=correo.val();
        let cel=celular.val();
        let s=sexo.val();
        let f=fecha_nacimiento.val();
    
        //alert(d+n+a+c+cel+s+f)

        $.ajax({
        
            type:"POST",
            url:"/actualizarcli",
            data:{
                dd:d,nn:n,aa:a,cc:c,cece:cel,ss:s,ff:f
            }
        })
        
    
    })
    
    $('.btndel').on('click',function(){
    
        alert("Borrado")
        let btn=$('.btndel').index(this);
        let documento=$('.documento').eq(btn);
        let nombre=$('.nombre').eq(btn);
        let apellido=$('.apellido').eq(btn);
        let correo=$('.correo').eq(btn);
        let celular=$('.celular').eq(btn);
        let sexo=$('.sexo').eq(btn);
        let fecha_nacimiento=$('.fecha_nacimiento').eq(btn);
    

    
        let d=documento.val();
        let n=nombre.val();
        let a=apellido.val();
        let c=correo.val();
        let cel=celular.val();
        let s=sexo.val();
        let f=fecha_nacimiento.val();
    
    
        $.ajax({
        
            type:"POST",
            url:"/borrarcli",
            data:{
                dd:d,nn:n,aa:a,cc:c,cece:cel,ss:s,ff:f
            }
        })
    
    
    })
    
    
    
    })