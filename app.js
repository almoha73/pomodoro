const timerDisplay = document.querySelector("#timer");
const timerTitle = document.querySelector("#timer-title");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");
const breakTimeDisplay = document.querySelector("#break-time");
const increaseBreakTimeBtn = document.querySelector("#increase-break-time");
const decreaseBreakTimeBtn = document.querySelector("#decrease-break-time");
const bell = document.querySelector("#bell");

let countdown;
let isWorking = true;
const workTime = 25 * 60;
let cycleCount = 0;

function startTimer() {
  if (countdown) {
    return;
  }

  let time = isWorking ? workTime : (cycleCount === 3 ? 20 * 60 : breakTimeDisplay.textContent * 60);
  const now = Date.now();
  const then = now + time * 1000;
  displayTimeLeft(time);
  timerTitle.textContent = isWorking ? "Temps de travail" : "Décompte du temps de repos";

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      countdown = null;
      if (isWorking) {
        cycleCount += 1;
      }
      isWorking = !isWorking;
      bell.play();
      startTimer();
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? "0" : ""}${remainderSeconds}`;
  timerDisplay.textContent = display;
}

function stopTimer() {
  clearInterval(countdown);
  countdown = null;
}

function resetTimer() {
  stopTimer();
  isWorking = true;
  cycleCount = 0;
  timerDisplay.textContent = "25:00";
  timerTitle.textContent = "Temps de travail";
}

function increaseBreakTime() {
  breakTimeDisplay.textContent = parseInt(breakTimeDisplay.textContent, 10) + 1;
}

function decreaseBreakTime() {
  breakTimeDisplay.textContent = parseInt(breakTimeDisplay.textContent, 10) - 1;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
increaseBreakTimeBtn.addEventListener("click", increaseBreakTime);
decreaseBreakTimeBtn.addEventListener("click", decreaseBreakTime);

