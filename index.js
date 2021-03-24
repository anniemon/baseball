const startBtn = document.querySelector("button"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input"),
    ballStrike = document.querySelector(".js-ballStrike");

const ANSWER_LS = "answer";
let strike = '';
let ball = '';
let counter = 0;

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

function handleSubmit (event){
    event.preventDefault();
    countSubmit();
    const currentValue = input.value;
    if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
        counter = counter -1;
    }
    else {
        comparedigit(currentValue);
        compareNumber(currentValue);
        paintballStrike();
    }
}

 function comparedigit(currentValue){
    const answer = localStorage.getItem(ANSWER_LS);
    if (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(1) === answer.charAt(1)
    && currentValue.charAt(2) === answer.charAt(2)){
        strike = '3 strike';
    }
    else if (
    (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(1) === answer.charAt(1))
    || (currentValue.charAt(0) === answer.charAt(0)
    && currentValue.charAt(2) === answer.charAt(2))
    || (currentValue.charAt(1) === answer.charAt(1)
    && currentValue.charAt(2) === answer.charAt(2))
    ){
        strike = '2 strike';
    }
    else if((currentValue.charAt(0) === answer.charAt(0)
    || currentValue.charAt(1) === answer.charAt(1)
    || currentValue.charAt(2) === answer.charAt(2))){
        strike = '1 strike';
    }
    else {
        strike = '0 strike';
    }
}

function compareNumber(currentValue){
    const answer = localStorage.getItem(ANSWER_LS);
    if (currentValue.includes(answer.charAt(0))
    && currentValue.includes(answer.charAt(1))
    && currentValue.includes(answer.charAt(2))){
        ball = '3 ball';
    }
    else if(
    (currentValue.includes(answer.charAt(0))
    && currentValue.includes(answer.charAt(1)))
    || (currentValue.includes(answer.charAt(0))
    && currentValue.includes(answer.charAt(2)))
    || (currentValue.includes(answer.charAt(1))
    && currentValue.includes(answer.charAt(2)))
    ) {
        ball = '2 ball';
    }
    else if(currentValue.includes(answer.charAt(0))
    || currentValue.includes(answer.charAt(1))
    || currentValue.includes(answer.charAt(2))){
        ball = '1 ball';
    }
    else {
        ball = '0 ball';
    }
}

function paintballStrike(){
    ballStrike.innerText = `${strike} ${ball} (${counter})`;
}

function countSubmit(){
    if ( counter >= 10){
        alert("입력 횟수를 초과하였습니다.");
        startBtn.innerText = 'ReStart';
        startBtn.addEventListener("click", Restart);
    }
    else {
        counter += 1;
    }
}

function Restart(){
    ballStrike.innerText = '';
    startBtn.innerText = 'Game Start';
    input.value = '';
    counter = 0;
}

function init (){
    startBtn.addEventListener("click", generateNumber);
    form.addEventListener("submit", handleSubmit);
}

init();