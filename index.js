const startBtn = document.querySelector("button"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input"),
    ballStrike = document.querySelector(".js-ballStrike");

const ANSWER_LS = "answer";
let strike = '';
let ball = '';
let submitCounter = 0;
let clickCounter = 0;

function saveNumber(text){
    localStorage.setItem(ANSWER_LS, text);
}

function generateNumber(){
    let result = '';
   for (var i=0; i<3; i++){
       result += Math.floor(Math.random()*10);
   }
   console.log(result);
   saveNumber(result);
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
    if (
        answer.includes(currentValue.charAt(0))
    && answer.includes(currentValue.charAt(1))
    && answer.includes(currentValue.charAt(2))
    && (currentValue.charAt(0) !== answer.charAt(0)
    && currentValue.charAt(1) !== answer.charAt(1)
    && currentValue.charAt(2) !== answer.charAt(2))
    ){
        ball = '3 ball';
    }
    else if(
    (answer.includes(currentValue.charAt(0))
    && answer.includes(currentValue.charAt(1))
    && (currentValue.charAt(0) !== answer.charAt(0)
    || currentValue.charAt(1) !== answer.charAt(1))) //2 ball
    ||(answer.includes(currentValue.charAt(0))
    && answer.includes(currentValue.charAt(2))
    && (currentValue.charAt(0) !== answer.charAt(0)
    || currentValue.charAt(2) !== answer.charAt(2)))
    ||(answer.includes(currentValue.charAt(1))
    && answer.includes(currentValue.charAt(2))
    && (currentValue.charAt(1) !== answer.charAt(1)
    || currentValue.charAt(2) !== answer.charAt(2)))
    ) {
        ball = '2 ball';
    }
    else if(
    (answer.includes(currentValue.charAt(0))
    && currentValue.charAt(0) !== answer.charAt(0))
    || (answer.includes(currentValue.charAt(1))
    && currentValue.charAt(1) !== answer.charAt(1))
    || (answer.includes(currentValue.charAt(2))
    && currentValue.charAt(2) !== answer.charAt(2))
    ){
        ball = '1 ball';
    }
    else {
        ball = '0 ball';
    }
}

function paintballStrike(){
    ballStrike.innerText = `${strike} ${ball} (${submitCounter})`;
}


function handleClick(){
    clickCounter +=1;
    const pseudosubmittedvalue = input.value;
    if ((pseudosubmittedvalue.length ===3
        && clickCounter >=1 && submitCounter ===0)
        || (pseudosubmittedvalue.length ===3
        && localStorage.getItem(ANSWER_LS) === null)){
        submitCounter += 1;
        generateNumber();
        comparedigit(pseudosubmittedvalue);
        compareNumber(pseudosubmittedvalue);
        paintballStrike();
    }
    else if (10 >= submitCounter && submitCounter > 0) {
        startBtn.removeEventListener("click", generateNumber);
    }
    else if (submitCounter > 10){
        Restart();
    }
    else {
        generateNumber();
    }
}

function handleSubmit (event){
    event.preventDefault();
    const currentValue = input.value;
    if (clickCounter === 0
        && submitCounter <= 1) {
        alert ("시작 버튼을 클릭하세요.");
    }
    else if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
    }
    else if (10 > submitCounter && submitCounter >=0){
        submitCounter += 1;
        comparedigit(currentValue);
        compareNumber(currentValue);
        paintballStrike();
    }
    else {
        submitCounter += 1;
        alert("입력 횟수를 초과하였습니다.");
        ballStrike.innerText = 'Game Over'
        startBtn.innerText = 'Restart';
        startBtn.addEventListener("click", handleClick);
    }
}

function Restart(){
    startBtn.innerText = 'Game Start';
    ballStrike.innerText = '❤❤❤';
    input.value = '';
    submitCounter = 0;
    clickCounter = 1;
    generateNumber();
}

function init (){
    startBtn.addEventListener("click", handleClick);
    form.addEventListener("submit", handleSubmit);
}

init();