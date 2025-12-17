// Queue model
let queue = [];
let maxSize = 0;

const sizeInput = document.getElementById('queueSize');
const valueInput = document.getElementById('queueValue');
const visualArea = document.getElementById('queueVisual');
const statusBox = document.getElementById('statusBox');

// Create queue with a fixed size
function createQueue() {
    maxSize = parseInt(sizeInput.value);
    if (!maxSize || maxSize <= 0) {
        statusBox.textContent = "Enter a valid queue size (positive integer).";
        return;
    }
    queue = [];
    updateStatus("Queue created successfully.");
    renderQueue();
}

// Enqueue element
function enqueueElement() {
    const val = valueInput.value.trim();
    if (val === '' || !/^[-+]?\d+$/.test(val)) {
        updateStatus("Enter a valid integer to enqueue.");
        return;
    }
    if (queue.length >= maxSize) {
        updateStatus("Queue is full! Cannot enqueue.");
        return;
    }
    queue.push(parseInt(val, 10));
    updateStatus(`Enqueued: ${val}`);
    renderQueue(queue.length - 1);
    valueInput.value = '';
}

// Dequeue element
function dequeueElement() {
    if (queue.length === 0) {
        updateStatus("Queue is empty! Cannot dequeue.");
        return;
    }
    const val = queue.shift();
    updateStatus(`Dequeued: ${val}`);
    renderQueue();
}

// Peek front element
function peekElement() {
    if (queue.length === 0) {
        updateStatus("Queue is empty!");
        return;
    }
    updateStatus(`Front element: ${queue[0]}`);
    renderQueue(0);
}

// Display queue elements
function displayQueue() {
    if (queue.length === 0) {
        updateStatus("Queue is empty!");
    } else {
        updateStatus(`Queue elements: ${queue.join(", ")}`);
    }
    renderQueue();
}

// Render visual queue
function renderQueue(highlightIndex = -1) {
  visualArea.innerHTML = '';
  queue.forEach((val, idx) => {
      const box = document.createElement('div');
      box.className = 'queue-element';
      box.textContent = val;
      if (idx === highlightIndex) box.style.transform = 'scale(1.1)';
      visualArea.appendChild(box);
  });

  // Render empty slots
  for (let i = queue.length; i < maxSize; i++) {
      const box = document.createElement('div');
      box.className = 'queue-element empty';
      box.textContent = '-';
      visualArea.appendChild(box);
  }
}


// Update status text
function updateStatus(msg) {
    statusBox.textContent = msg;
}

// Initial render
renderQueue();
