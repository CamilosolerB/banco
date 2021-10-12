$(document).ready(function(){
    $('.btnact').on('click',function(){
        
        
        let btn=$('.btnact').index(this);
        let codigo=$('.codigo').eq(btn);
        let documento=$('.documento').eq(btn);
        let codlinea=$('.codlinea').eq(btn);
        let monto=$('.monto').eq(btn);
        let fecha=$('.fecha').eq(btn);
        let plazo=$('.plazo').eq(btn);
    
    
        let c=codigo.val();
        let d=documento.val();
        let cl=codlinea.val();
        let m=monto.val();
        let f=fecha.val();
        let p=plazo.val();
    
        $.ajax({
        
            type:"POST",
            url:"/actualizarcre",
            data:{
                cc:c,dd:d,clcl:cl,mm:m,ff:f,pp:p
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
            url:"/borrarcre",
            data:{
                cc:c
            }
        })
    
    
    })
    
    
    
    })