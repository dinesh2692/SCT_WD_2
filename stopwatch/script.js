let minutes = 0, seconds = 0, milliseconds = 0;
let timer;
let running = false;

const minEl = document.getElementById('minutes');
const secEl = document.getElementById('seconds');
const msEl = document.getElementById('milliseconds');
const lapsEl = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
  if (!running) {
    running = true;
    timer = setInterval(runTimer, 10);
  }
}

function runTimer() {
  milliseconds += 10;
  if (milliseconds >= 1000) {
    milliseconds = 0;
    seconds++;
  }
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
  }
  updateDisplay();
}

function pauseTimer() {
  running = false;
  clearInterval(timer);
}

function resetTimer() {
  running = false;
  clearInterval(timer);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  lapsEl.innerHTML = '';
  updateDisplay();
}

function recordLap() {
  if (running) {
    const lapTime = `${format(minutes)}:${format(seconds)}:${formatMs(milliseconds)}`;
    const li = document.createElement('li');
    li.textContent = `Lap ${lapsEl.children.length + 1}: ${lapTime}`;
    lapsEl.appendChild(li);
  }
}

function updateDisplay() {
  minEl.textContent = format(minutes);
  secEl.textContent = format(seconds);
  msEl.textContent = formatMs(milliseconds);
}

function format(num) {
  return num < 10 ? '0' + num : num;
}

function formatMs(ms) {
  return String(ms / 10).padStart(2, '0');
}
