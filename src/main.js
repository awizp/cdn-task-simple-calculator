// variables,
const resultScreen = document.querySelector(".result");
const previewScreen = document.querySelector(".preview");
const basicCal = document.querySelector(".basic");
const specialBtnEls = document.querySelectorAll(".special-btn");

let currentVal = "";
let previousVal = "";
let operator = "";
let specialOperator = "";
let preview = "";

// adding function to document to check it's the button or not,
document.addEventListener("click", e => {
    const btn = e.target;
    if (!btn.matches("button")) return;

    const value = btn.dataset.value;
    const operator = btn.dataset.operator;
    const specialFunc = btn.dataset.function;

    if (value) {
        append(value);
    };

    if (operator) {
        chooseOperator(operator);
    };

    if (specialFunc) {
        chooseSpecialOp(specialFunc);
    };

    if (btn.id === "equals") {
        if (specialOperator) {
            calculateSpecial();
        } else {
            calculate();
        }
    };

    if (btn.id === "ac") {
        clearAll();
    };

    if (btn.id === "delete") {
        backspace();
    };

    if (btn.id === "toggle-btn") {
        toggleSpecial();
    }
});

const toggleSpecial = () => {
    specialBtnEls.forEach((btn) => {
        if (btn.classList.contains('hidden')) {
            basicCal.classList.remove('grid-cols-4');
            basicCal.classList.add("grid-cols-5");
            btn.classList.remove('hidden');
        } else {
            basicCal.classList.add('grid-cols-4');
            basicCal.classList.remove("grid-cols-5");
            btn.classList.add('hidden');
        }
    });
};

// apend the values in result screen,
const append = (value) => {
    if (value === "." && currentVal.includes(".")) return;
    currentVal += value;
    preview += value;
    update();
};

// operator choose function,
const chooseOperator = (operatorVal) => {
    if (!currentVal) return;
    operator = operatorVal;
    previousVal = currentVal;
    preview += operatorVal;
    currentVal = "";
    update();
};

// special operator choose function,
const chooseSpecialOp = (specialOperatorVal) => {
    specialOperator = specialOperatorVal;

    switch (specialOperatorVal) {
        case "PI":
            currentVal = Math.PI.toString();
            preview = "π";
            break;

        case "log":
            preview = "log(";
            currentVal = "";
            break;

        case "ln":
            preview = "ln(";
            currentVal = "";
            break;

        case "sqX":
            preview = "√(";
            currentVal = "";
            break;

        case "powX":
            if (!currentVal) return;
            previousVal = currentVal;
            currentVal = "";
            preview = previousVal + "^";
            break;
    }

    update();
};

// calculating the result,
const calculate = () => {
    if (!previousVal || !currentVal) return;
    const a = parseFloat(previousVal);
    const b = parseFloat(currentVal);

    let result;
    switch (operator) {
        case "+":
            result = a + b;
            break;

        case "-":
            result = a - b;
            break;

        case "*":
            result = a * b;
            break;

        case "/":
            result = b === 0 ? "Error" : a / b;
            break;
    }

    currentVal = result.toString();
    preview = currentVal;
    previousVal = operator = "";
    update();
};

// calculating special operators,
const calculateSpecial = () => {
    let value = parseFloat(currentVal);
    let result;

    switch (specialOperator) {
        case "log":
            result = Math.log10(value);
            break;

        case "ln":
            result = Math.log(value);
            break;

        case "sqX":
            result = value < 0 ? "Error" : Math.sqrt(value);
            break;

        case "powX":
            result = Math.pow(parseFloat(previousVal), value);
            break;
    }

    currentVal = result.toString();
    preview = currentVal;
    specialOperator = "";
    previousVal = "";
    update();
};

// remove the last number by backspace,
const backspace = () => {
    currentVal = currentVal.slice(0, -1);
    preview = currentVal;
    update();
};

// remove all values in screen,
const clearAll = () => {
    currentVal = previousVal = "";
    operator = preview = "";
    update();
};

// managing the state of the result and preview screen,
const update = () => {
    previewScreen.textContent = preview || "...";
    resultScreen.textContent = currentVal || "0";
};
