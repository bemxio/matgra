function generateRandomEquation() {
    first = Math.floor(Math.random() * 10);
    second = Math.floor(Math.random() * 10);
    operator = operators[Math.floor(Math.random() * operators.length)];

    switch (operator) {
        case "+":
            result = first + second;
            break;
        case "-":
            result = first - second;
            break;
        case "*":
            result = first * second;
            break;
    }
}

function changeElementValues() {
    equation.innerText = `${first} ${operator} ${second} = `;
    counter.innerHTML = `<b>Wynik:</b> ${score}`;
}

// elements in the page
const equation = document.getElementById("equation-question");
const input = document.getElementById("equation-answer");
const counter = document.getElementById("score-counter");
const indicator = document.getElementById("truthfulness-indicator");

// constants
const operators = ["+", "-", "*"];
const indicatorStyles = {
    true: () => {
        indicator.innerText = "Dobrze!";
        indicator.style.color = "greenyellow";
    },

    false: () => {
        indicator.innerText = "Źle!";
        indicator.style.color = "red";
    }
};

// variables
let operator, first, second;
let result, answer;
let score = 0;
let check;

// generate an inital equation
generateRandomEquation();
changeElementValues();

// event listeners
document.addEventListener("keydown", (event) => {
    if (event.key != "Enter") {
        return;
    }

    // get the answer 
    if (input.value == "") {
        answer = undefined;
    } else {
        answer = parseInt(input.value);
    }
    
    // check the answer & increment or reset the score
    check = answer == result;

    if (check) {
        score++;
    } else {
        score = 0;
    }

    indicatorStyles[check]();

    // generate a new equation
    generateRandomEquation();
    changeElementValues();

    // reset the value in the answer
    input.value = "";
});