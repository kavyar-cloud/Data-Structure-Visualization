let stack = [];
let maxSize = 0;

const stackVisual = document.getElementById('stackVisual');
const statusBox = document.getElementById('statusBox');

/* CREATE STACK */
function createStack() {
    const sizeInput = document.getElementById('stackSize').value;
    maxSize = parseInt(sizeInput);

    if (isNaN(maxSize) || maxSize <= 0) {
        statusBox.textContent = "Enter a valid stack size";
        return;
    }

    stack = Array(maxSize).fill(null);
    renderStack();
    statusBox.textContent = `Stack created with size ${maxSize}`;
}

/* RENDER STACK */
function renderStack() {
    stackVisual.innerHTML = '';

    for (let i = maxSize - 1; i >= 0; i--) {
        const el = document.createElement('div');
        el.classList.add('queue-element');

        if (stack[i] === null) {
            el.classList.add('empty');
            el.textContent = '';
        } else {
            el.textContent = stack[i];
        }

        stackVisual.appendChild(el);
    }
}

/* PUSH */
function pushElement() {
    const value = document.getElementById('stackValue').value.trim();

    if (!value) {
        statusBox.textContent = "Enter a value to push";
        return;
    }

    const index = stack.indexOf(null);
    if (index === -1) {
        statusBox.textContent = "Stack Overflow!";
        return;
    }

    stack[index] = value;
    document.getElementById('stackValue').value = '';
    renderStack();
    statusBox.textContent = `Pushed ${value}`;
}

/* POP (FIXED) */
function popElement() {
    let topIndex = stack.length - 1;

    while (topIndex >= 0 && stack[topIndex] === null) {
        topIndex--;
    }

    if (topIndex < 0) {
        statusBox.textContent = "Stack Underflow!";
        return;
    }

    const poppedValue = stack[topIndex];
    stack[topIndex] = null;
    renderStack();
    statusBox.textContent = `Popped ${poppedValue}`;
}

/* PEEK (FIXED) */
function peekElement() {
    let topIndex = stack.length - 1;

    while (topIndex >= 0 && stack[topIndex] === null) {
        topIndex--;
    }

    if (topIndex < 0) {
        statusBox.textContent = "Stack is empty";
        return;
    }

    statusBox.textContent = `Top element: ${stack[topIndex]}`;
}

/* DISPLAY */
function displayStack() {
    const elements = stack.filter(v => v !== null);

    if (elements.length === 0) {
        statusBox.textContent = "Stack is empty";
    } else {
        statusBox.textContent =
            `Stack (top → bottom): ${elements.slice().reverse().join(', ')}`;
    }
}
