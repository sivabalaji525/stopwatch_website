let startTime;
let elapsedTime = 0;
let timeInterval;
const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

function updateDisplay(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const centiseconds = Math.floor((time % 1000) / 10);

    const timeArray = [
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
        centiseconds.toString().padStart(2, '0')
    ];

    const spans = display.getElementsByTagName('span');
    spans[0].textContent = timeArray[0][0];
    spans[1].textContent = timeArray[0][1];
    spans[3].textContent = timeArray[1][0];
    spans[4].textContent = timeArray[1][1];
    spans[6].textContent = timeArray[2][0];
    spans[7].textContent = timeArray[2][1];
}

// Call updateDisplay with 0 immediately when the script loads
updateDisplay(0);

function startTimer() {
    if (!timeInterval) {
        startTime = Date.now() - elapsedTime;
        timeInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        startButton.disabled = true;
        pauseButton.disabled = false;
    }
}

function pauseTimer() {
    if (timeInterval) {
        clearInterval(timeInterval);
        timeInterval = null;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timeInterval);
    timeInterval = null;
    elapsedTime = 0;
    updateDisplay(0);
    startButton.disabled = false;
    pauseButton.disabled = false;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
updateDisplay(0);
