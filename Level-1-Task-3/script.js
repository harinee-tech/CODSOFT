const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (!value) return;

    // Prevent multiple decimals in the same number
    if (value === ".") {
      const parts = display.value.split(/[\+\-\*\/]/);
      if (parts[parts.length - 1].includes(".")) return;
    }

    // Prevent consecutive operators
    const operators = ["+", "-", "*", "/"];
    const lastChar = display.value.slice(-1);
    if (operators.includes(value) && operators.includes(lastChar)) {
      display.value = display.value.slice(0, -1);
    }

    display.value += value;
  });
});

clear.addEventListener('click', () => {
  display.value = '';
});

equals.addEventListener('click', () => {
  try {
    if (display.value === "") return;
    display.value = eval(display.value);
  } catch {
    display.value = 'Error';
  }
});
