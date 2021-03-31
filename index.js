const startBtn = document.querySelector(".start"),
    restartBtn = document.querySelector(".restart"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input"),
    ballStrike = document.querySelector(".js-ballStrike"),
    numberList = document.querySelector(".js-numberList");

const ANSWER_LS = "answer",
    SHOWING_ON = "showing";
let strike = '';
let ball = '';
let submitCounter = 0;

function countStrike(currentValue){
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

function countBall(currentValue){
    const answer = localStorage.getItem(ANSWER_LS);
    if (answer.includes(currentValue.charAt(0))
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
    && currentValue.charAt(1) !== answer.charAt(1))) //2 ball
    ||(answer.includes(currentValue.charAt(0))
    && answer.includes(currentValue.charAt(2))
    && (currentValue.charAt(0) !== answer.charAt(0)
    && currentValue.charAt(2) !== answer.charAt(2)))
    ||(answer.includes(currentValue.charAt(1))
    && answer.includes(currentValue.charAt(2))
    && (currentValue.charAt(1) !== answer.charAt(1)
    && currentValue.charAt(2) !== answer.charAt(2)))
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

function paintballStrike(number){
    const li = document.createElement("li");
    li.innerText = `${submitCounter}. ${strike} ${ball} (${number})`;
    numberList.appendChild(li);
}

function restart(){
    generateNumber();
    restartBtn.classList.remove(SHOWING_ON);
    startBtn.classList.add(SHOWING_ON);
    input.value = '';
    submitCounter = 0;
    let cleanNumber = document.querySelector("li").parentNode;
    while (cleanNumber.firstChild){
        cleanNumber.removeChild(cleanNumber.firstChild);
    }
}

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
   ballStrike.innerText = '❤❤❤';
}

function handleClick(){
    generateNumber();
    if (10 > submitCounter && submitCounter >=0){
    startBtn.removeEventListener("click", handleClick);
    }
}

function handleSubmit (event){
    event.preventDefault();
    const currentValue = input.value;
    if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
    }
    else if (10 > submitCounter && submitCounter >=0){
        submitCounter += 1;
        countStrike(currentValue);
        countBall(currentValue);
        if (strike === '3 strike' && ball === '0 ball'){
            paintballStrike(currentValue);
            startBtn.classList.remove(SHOWING_ON);
            restartBtn.classList.add(SHOWING_ON);
            restartBtn.addEventListener("click", restart);
        }
        else {
            paintballStrike(currentValue);
        }
    }
    else {
        submitCounter += 1;
        alert("입력 횟수를 초과하였습니다.");
        ballStrike.innerText = 'Game Over';
        startBtn.classList.remove(SHOWING_ON);
        restartBtn.classList.add(SHOWING_ON);
        restartBtn.addEventListener("click", restart);
    }
}

function loadNumber(event){
    const loadedNumber = localStorage.getItem(ANSWER_LS);
    if(loadedNumber === null){
        alert("시작 버튼을 클릭하세요.");
    }
    else{
        handleSubmit(event);
    }
}

function init (){
    startBtn.addEventListener("click", handleClick);
    form.addEventListener("submit", loadNumber);
    startBtn.classList.add(SHOWING_ON);
    localStorage.removeItem(ANSWER_LS);
}

init();