$(document).ready(function(){

    $('.btnact').on('click',function(){
        
        let btn=$('.btnact').index(this);
        let codlinea=$('.codlinea').eq(btn);
        let nomlinea=$('.nomlinea').eq(btn);
        let montomaximo=$('.montomaximo').eq(btn);
        let plazomax=$('.plazomax').eq(btn);
    
        let c=codlinea.val();
        let n=nomlinea.val();
        let m=montomaximo.val();
        let p=plazomax.val();
    
    
        $.ajax({
        
            type:"POST",
            url:"/actualizarli",
            data:{
                cc:c,nn:n,mm:m,pp:p
            }
        })
        
    
    })
    
    $('.btndel').on('click',function(){
    
        alert("Borrado")
        let btn=$('.btndel').index(this);
        let codlinea=$('.codlinea').eq(btn);
    
    
        let c=codlinea.val();    
        $.ajax({
        
            type:"POST",
            url:"/borrarlin",
            data:{
                cc:c
            }
        })
    
    
    })
})