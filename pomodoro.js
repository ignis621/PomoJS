/* WARNING: VIEWER DISCRETION ADVISED!
  THIS CODE IS NOT FOR THE FAINT OF HEART!
  YOU MIGHT SUFFER SEVERE BRAIN DAMAGE FROM READING THIS!
  This is my first attempt at writing something in JS, so the code is... let's just say not my finest work.
  But hey, it gets the job done... kind of.
*/

const statusElement = document.getElementById('status');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const workLength = document.getElementById('work-length');
const shortBreakLength = document.getElementById('short-break-length');
const longBreakLength = document.getElementById('long-break-length');
const numShortBreaks = document.getElementById('num-short-breaks');

const idleStatusText="Let's get some work done"
const idleTimerText="PomoJS"

const shortBreakAudio = new Audio('audio/intervals/shortBreak.ogg');
const longBreakAudio = new Audio('audio/intervals/longBreak.ogg');
const workAudio = new Audio('audio/intervals/work.ogg');
const startAudio = new Audio('audio/actions/start.ogg');
const stopAudio = new Audio('audio/actions/stop.ogg');
const pauseAudio = new Audio('audio/actions/pause.ogg');
const resumeAudio = new Audio('audio/actions/resume.ogg');

pauseBtn.disabled = true;
stopBtn.disabled = true;

const aboutSection = document.getElementById('about');
console.log(aboutSection);

let intervalId;
let timeLeft;
let isWorking = true;
let shortBreakCount = 0;
let isPaused = false;
function startTimer(durationInSeconds, isWorkingTime, label) {
  timeLeft = durationInSeconds;
  isWorking = isWorkingTime;
  statusElement.innerHTML = label;

  intervalId = setInterval(() => {
    if (!isPaused) {
      timeLeft--;

      if (timeLeft <= 0) {
        clearInterval(intervalId);

        if (isWorking) {
          if (shortBreakCount === parseInt(numShortBreaks.value)) {
            startTimer(longBreakLength.value * 60, false, "Long Break");
            longBreakAudio.play();
            shortBreakCount = 0;
          } else {
            startTimer(shortBreakLength.value * 60, false, "Short Break");
            shortBreakCount++;
            shortBreakAudio.play();
          }
          setStatusColor('break');

        } else {
          startTimer(workLength.value * 60, true, "Working");
          workAudio.play();
          setStatusColor('work');

        }
        updateTimer();
      } else {
        updateTimer();
      }
    }
  }, 1000);
}

function updateTimer(){
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.innerHTML = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
  const duration = workLength.value * 60;
  startTimer(duration, true, "Working");
  updateTimer();

  switchInputs(false);
  startBtn.disabled = true;
  startBtn.classList.add('disabled');
  pauseBtn.disabled = false;
  pauseBtn.classList.remove('disabled');
  stopBtn.disabled = false;
  stopBtn.classList.remove('disabled');
  startAudio.play();
  aboutSection.classList.add('hidden');
  setStatusColor('work');
});

pauseBtn.addEventListener('click', () => {
  if (isPaused) {
    isPaused = false;
    pauseBtn.innerHTML = 'Pause';
    resumeAudio.play();
    if(isWorking){
      setStatusColor('work');
    }else{
      setStatusColor('break');
    }
  } else {
    isPaused = true;
    pauseBtn.innerHTML = 'Resume';
    pauseAudio.play();
    setStatusColor('paused');
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  timerElement.innerHTML = '';
  shortBreakCount = 0;
  isPaused = false;
  timeLeft = 0;
  isWorking = true;

  timerElement.innerHTML = idleTimerText;
  statusElement.innerHTML = idleStatusText;
  pauseBtn.innerHTML = 'Pause';
  startBtn.disabled = false;
  startBtn.classList.remove('disabled');
  pauseBtn.disabled = true;
  pauseBtn.classList.add('disabled');
  stopBtn.disabled = true;
  stopBtn.classList.add('disabled');
  stopAudio.play();
  aboutSection.classList.remove('hidden');
  switchInputs(true);
  setStatusColor("idle"); 
});

function setStatusColor(status) {
  document.documentElement.classList = [];
  document.documentElement.classList.add(status);
}

function switchInputs(enabled){
  const inputElements = document.querySelectorAll('input[type="number"]');
inputElements.forEach(input => {
  input.disabled = !enabled;
  if(enabled){
    input.classList.remove('disabled');
  }else{
    input.classList.add('disabled');
  }
});
}