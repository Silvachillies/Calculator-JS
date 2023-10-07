const numbers = document.querySelectorAll(".numbers");
const displayScreen = document.querySelector(".screen");
const previous = document.querySelector(".previous");
const operatorBtn = document.querySelectorAll(".operator");

let currentNum = "";
let previousNum = "";
let operator = "";

window.addEventListener("keydown", keyPress);

const equal = document.getElementById("equal");
equal.addEventListener("click", () => {
  if (currentNum && previousNum !== "") {
    operate();
  }
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
  clearDisplay();
});

//Display numbers on screen
numbers.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    handleNumber(e.target.textContent);
  })
);

function handleNumber(number) {
  if (previousNum !== "" && currentNum !== "" && operator === "") {
    previousNum = "";
    displayScreen.textContent = currentNum;
  }
  if (currentNum.length <= 11) {
    currentNum += number;
    displayScreen.textContent = currentNum;
  }
}

//Assign operator

operatorBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
  })
);

function handleOperator(op) {
  if (previousNum === "") {
    previousNum = currentNum;
    operatorCheck(op);
  } else if (currentNum === "") {
    operatorCheck(op);
  } else {
    operate();
    operator = op;
    displayScreen.textContent = "0";
    previous.textContent = previousNum + " " + operator;
  }
}

function operatorCheck(text) {
  operator = text;
  previous.textContent = previousNum + " " + operator;
  displayScreen.textContent = "0";
  currentNum = "";
}

function operate() {
  previousNum = Number(previousNum);
  currentNum = Number(currentNum);

  if (operator === "+") {
    previousNum += currentNum;
  } else if (operator === "-") {
    previousNum += currentNum;
  } else if (operator === "x") {
    previousNum *= currentNum;
  } else if (operator === "/") {
    if (currentNum <= 0) {
      previousNum = "Error";
      displayResults();
      return;
    }
    previousNum /= currentNum;
  }
  previousNum = roundNumber(previousNum);
  previousNum = previousNum.toString();
  displayResults();
}

function roundNumber(num) {
  return Math.round(num * 10000) / 10000;
}

function displayResults() {
  if (previousNum.length <= 11) {
    displayScreen.textContent = previousNum;
  } else {
    displayScreen.textContent = previousNum.slice(0, 11) + "...";
  }
  previous.textContent = "";
  operator = "";
  currentNum = "";
}

function clearDisplay() {
  currentNum = "";
  previousNum = "";
  operator = "";
  displayScreen.textContent = "";
  previous.textContent = "";
}

function addDecimal() {
  if (!currentNum.includes(".")) {
    currentNum += ".";
    displayScreen.textContent = currentNum;
  }
}

function keyPress(e) {
  e.preventDefault();
  if (e.key >= 0 && e.key <= 9) {
    handleNumber(e.key);
  }
  if (
    e.key === "Enter" ||
    (e.key === "=" && currentNum != "" && previousNum != "")
  ) {
    operate();
  }
  if (e.key === "+" || e.key === "-" || e.key === "/") {
    handleOperator(e.key);
  }
  if (e.key === "*") {
    handleOperator("x");
  }
  if (e.key === ".") {
    addDecimal();
  }
  if (e.key === "Backspace") {
    handleDelete();
  }
}

function handleDelete() {
  if (currentNum !== "") {
    currentNum = currentNum.slice(0, -1);
    displayScreen.textContent = currentNum;
    if (currentNum === "") {
      displayScreen.textContent = 0;
    }
  }
  if (currentNum === "" && previousNum !== "" && operator === "") {
    previousNum = previousNum.slice(0, -1);
    currentDisplayNumber.textContent = previousNum;
  }
}
