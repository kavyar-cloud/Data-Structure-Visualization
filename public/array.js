// Basic model
let arr = [];
let maxSize = 0;

const sizeInput = document.getElementById('sizeInput');
const valuesInput = document.getElementById('valuesInput');
const createBtn = document.getElementById('createBtn');
const visualArea = document.getElementById('visualArea');
const statusText = document.getElementById('statusText');
const opsSection = document.getElementById('ops');

createBtn.addEventListener('click', createArray);

// Create Array from inputs
function createArray() {
  const sizeVal = parseInt(sizeInput.value);
  const raw = valuesInput.value.trim();

  if (!sizeVal || sizeVal <= 0) {
    updateStatus('Enter a valid array size (positive integer).');
    return;
  }

  if (raw.length === 0) {
    updateStatus('Enter comma-separated integer elements (or at least one).');
    return;
  }

  const parts = raw.split(',').map(s => s.trim()).filter(s => s.length > 0);

  // validate integers
  const parsed = [];
  for (let p of parts) {
    if (!/^[-+]?\d+$/.test(p)) {
      updateStatus(`Invalid element "${p}". Only integers allowed.`);
      return;
    }
    parsed.push(parseInt(p, 10));
  }

  if (parsed.length > sizeVal) {
    updateStatus('More elements provided than array size. Reduce elements or increase size.');
    return;
  }

  // success
  arr = parsed.slice();           // copy
  maxSize = sizeVal;
  updateStatus('Array created successfully.');
  renderArray();
  opsSection.classList.remove('hidden');
}

// Render visual array
function renderArray(highlightIndex = -1) {
  visualArea.innerHTML = '';
  // render current elements
  arr.forEach((val, idx) => {
    const box = document.createElement('div');
    box.className = 'array-box pop-in';
    box.textContent = val;
    if (idx === highlightIndex) box.classList.add('highlight');
    visualArea.appendChild(box);
  });

  // render empty slots
  for (let i = arr.length; i < maxSize; i++) {
    const e = document.createElement('div');
    e.className = 'array-box empty shift-in';
    e.textContent = ''; // empty
    visualArea.appendChild(e);
  }
}

// Update status message
function updateStatus(msg) {
  statusText.textContent = msg;
}

// Insert handler
function handleInsert() {
  const input = document.getElementById('insertVal');
  const v = input.value.trim();
  if (v === '') { updateStatus('Enter value to insert.'); return; }
  if (!/^[-+]?\d+$/.test(v)) { updateStatus('Insert valid integer.'); return; }

  if (arr.length >= maxSize) { updateStatus('Array Full! Cannot insert.'); return; }

  const val = parseInt(v, 10);
  arr.push(val);

  // animation: add temporary box then re-render
  const box = document.createElement('div');
  box.className = 'array-box pop-in';
  box.textContent = val;
  visualArea.appendChild(box);

  updateStatus(`Inserted ${val} at index ${arr.length - 1}`);
  setTimeout(() => renderArray(arr.length - 1), 350);
  input.value = '';
}

// Delete handler
function handleDelete() {
  const idxInput = document.getElementById('deleteIdx');
  const idx = parseInt(idxInput.value);
  if (isNaN(idx)) { updateStatus('Enter index to delete.'); return; }
  if (idx < 0 || idx >= arr.length) { updateStatus('Invalid index to delete.'); return; }

  // animate deletion: fade out then remove
  const boxes = visualArea.querySelectorAll('.array-box');
  const target = boxes[idx];
  if (target) {
    target.classList.add('fade-out');
  }
  setTimeout(() => {
    arr.splice(idx, 1);
    updateStatus(`Deleted element at index ${idx}`);
    renderArray();
  }, 420);

  idxInput.value = '';
}

// Show length
function showLength() {
  updateStatus(`Current length: ${arr.length}`);
}

// Utility: search can be added later
// Initial render
renderArray();
