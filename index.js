const startBtn = document.querySelector("button"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input");


function generateNumber(){
   let result = '';
   for (var i=0; i<3; i++){
       result += Math.floor(Math.random()*10);
   }
   return result;
}

function handleSubmit (){
    const currentValue = input.value;
    if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
    }
    compareNumber(currentValue);
}

function compareNumber(){
    const answer = generateNumber();
    if (answer ===){

    }
}

function init (){
    form.addEventListener("submit", handleSubmit);
    startBtn.addEventListener("click", generateNumber);
}

init();