let input= document.getElementById('inputBox');
let buttons= Array.from(document.querySelectorAll('button'));
let expr="";
buttons.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const val=  e.currentTarget.textContent.trim();
        
      if(val==='='){
        expr=eval(expr);
        input.value=expr;
      }
      else if(val==='AC'){
        expr="";
        input.value=expr;
      }
      else if(val==='DEL'){
        expr=expr.substring(0,expr.length-1);
        input.value=expr;
      }
      else{
        expr +=val;
        input.value=expr;
      }
    });
});
