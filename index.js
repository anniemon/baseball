const startBtn = document.querySelector("button"),
    form = document.querySelector(".js-numberForm"),
    input = form.querySelector("input");

let result = '';

function generateNumber(){
   for (var i=0; i<3; i++){
       result += Math.floor(Math.random()*10);
   }
   console.log(result);
}

function handleSubmit (){
    const currentValue = input.value;
    if (currentValue.length !== 3){
        alert("세 자릿수를 입력하세요.");
    }
    else {
        compareNumber(currentValue);
    }
}

 function compareNumber(submittedNumber){
    if (result.charAt(0) === submittedNumber.charAt(0)
    && result.charAt(1) === submittedNumber.charAt(1)
    && result.charAt(2) === submittedNumber.charAt(2)){
        alert('3 strike');
    }
    else if (
    (result.charAt(0) === submittedNumber.charAt(0)
    && result.charAt(1) === submittedNumber.charAt(1))
    || (result.charAt(0) === submittedNumber.charAt(0)
    && result.charAt(2) === submittedNumber.charAt(2))
    || (result.charAt(1) === submittedNumber.charAt(1)
    && result.charAt(2) === submittedNumber.charAt(2))
    ){
        alert('2 strike');
    }
    else if((result.charAt(0) === submittedNumber.charAt(0)
    || result.charAt(1) === submittedNumber.charAt(1)
    || result.charAt(2) === submittedNumber.charAt(2))){
        alert('1 strike');
    }
}

function init (){
    form.addEventListener("submit", handleSubmit);
    startBtn.addEventListener("click", generateNumber);
}

init();