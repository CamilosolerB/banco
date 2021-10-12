$(document).ready(function(){

$('.btnact').on('click',function(){
    

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

    //alert(d+"\n"+n+"\n"+c+"\n"+r+"\n"+e+"\n"+i)

    $.ajax({
    
        type:"POST",
        url:"/actualizar",
        data:{
            dd:d,nn:n,cc:c,rr:r,ee:e,ii:i
        }
    })


})

$('.btndel').on('click',function(){
    
    let btn=$('.btndel').index(this);
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


    $.ajax({
    
        type:"POST",
        url:"/borrarusu",
        data:{
            dd:d,nn:n,cc:c,rr:r,ee:e,ii:i
        }
    })


})




})