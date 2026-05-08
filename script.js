let display = document.getElementById('display');

function appendNumber(num) {
    display.value += num;
}

function appendOperator(operator) {
    if (display.value === '') {
        return;
    }
    
    // Prevent multiple decimal points
    if (operator === '.') {
        const lastNumber = display.value.split(/[+\-*/]/).pop();
        if (lastNumber.includes('.')) {
            return;
        }
    }
    
    display.value += operator;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const result = eval(display.value);
        
        if (isNaN(result) || !isFinite(result)) {
            display.value = 'Error';
        } else {
            display.value = Math.round(result * 100000000) / 100000000;
        }
    } catch (error) {
        display.value = 'Error';
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        event.preventDefault();
        appendOperator(key);
    } else if (key === '.') {
        event.preventDefault();
        appendOperator('.');
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    } else if (key === 'Escape') {
        clearDisplay();
    }
});