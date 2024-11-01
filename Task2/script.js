let display = document.getElementById('display');
let currentInput = '';
let operator = '';
let previousInput = '';

function appendNumber(number) {
  if (currentInput === '0' && number === '0') return; // Prevent multiple leading zeros
  currentInput += number;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '' && previousInput === '') return;
  if (operator && currentInput) {
    calculate(); // Perform the previous operation before setting a new operator
  }
  operator = op;
  previousInput = currentInput;
  currentInput = '';
  updateDisplay();
}

function updateDisplay() {
  // Display the operation symbol along with numbers
  display.innerText = previousInput + ' ' + operator + ' ' + currentInput;
}

function clearDisplay() {
  currentInput = '';
  operator = '';
  previousInput = '';
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.toString().slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (!operator || currentInput === '') return;
  
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  
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
      result = current === 0 ? 'Error' : prev / current;
      break;
    default:
      return;
  }
  
  currentInput = result.toString();
  operator = '';
  previousInput = '';
  updateDisplay();
}
