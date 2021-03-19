const startBtn = document.querySelector("button");


function generateNumber(){
   let result = '';
   for (var i=0; i<3; i++){
       result += Math.floor(Math.random()*10);
   }
   console.log(result);
}

function init (){
    startBtn.addEventListener("click", generateNumber);
}

init();