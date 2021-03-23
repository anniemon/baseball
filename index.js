const startBtn = document.querySelector("button"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input");

const ANSWER_LS = "answer";

function generateNumber(){
    let result = '';
   for (var i=0; i<3; i++){
       result += Math.floor(Math.random()*10);
   }
   console.log(result);
   saveNumber(result);
}

function saveNumber(text){
    localStorage.setItem(ANSWER_LS, text);
}

function handleSubmit (){
    const currentValue = input.value;
    const answer = localStorage.getItem(ANSWER_LS);
    if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
    }
    else {
        compareNumber(currentValue, answer);
    }
}

 function compareNumber(currentValue, answer){
    if (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(1) === answer.charAt(1)
    && currentValue.charAt(2) === answer.charAt(2)){
        alert('3 strike');
    }
    else if (
    (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(1) === answer.charAt(1))
    || (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(2) === answer.charAt(2))
    || (currentValue.charAt(1) === answer.charAt(1)
    && currentValue.charAt(2) === answer.charAt(2))
    ){
        alert('2 strike');
    }
    else if((currentValue.charAt(0) === answer.charAt(0)
    || currentValue.charAt(1) === answer.charAt(1)
    || currentValue.charAt(2) === answer.charAt(2))){
        alert('1 strike');
    }
    else {
        alert('0 strike');
    }
}

function init (){
    form.addEventListener("submit", handleSubmit);
    startBtn.addEventListener("click", generateNumber);
}

init();