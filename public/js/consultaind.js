$(document).ready(function(){

    $('.iniciar').on('click',function(){
        let nombre=$('nombre').eq(btn);
        let clave=$('clave').eq(btn);

        let n=nombre.val();
        let c=clave.val();

        $.ajax({
            type:"POST",
            url:"/cliente",
            data:{
                nn:n,cc:c
            }
        })
        alert("envio de datos exitoso")
    })
})