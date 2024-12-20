const resultDisplay = document.querySelector('.result');
const buttons = document.querySelectorAll('button');

let currentInput = '0';
let previousInput = '';
let operator = null;

function updateResult() {
    resultDisplay.textContent = currentInput;
}

function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateResult();
}

function clearLast() {
    currentInput = '0';
    updateResult();
}

function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateResult();
}

function setOperator(op) {
    if (operator !== null) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    currentInput = '';
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateResult();
}

function appendDecimal() {
    if (!currentInput.includes(',')) {
        currentInput += ',';
        updateResult();
    }
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText) || buttonText === ',') {
            if (buttonText === ',') {
                appendDecimal();
            } else {
                appendNumber(buttonText);
            }
        }        

        if (['+', '-', '*', '/', '%'].includes(buttonText)) {
            setOperator(buttonText);
        }

        if (buttonText === '=') {
            calculate();
        }

        if (buttonText === 'C') {
            clearAll();
        }
        if (buttonText === 'CE') {
            clearLast();
        }
    });
});
