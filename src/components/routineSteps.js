/* document.addEventListener('DOMContentLoaded', () => {
  const addStepBtn = document.querySelector('#addStepBtn'); 
  const routineList = document.querySelector('#routineList'); 
  const stepTemplate = document.querySelector('#routine-step-template'); 
  const startTimerBtn = document.querySelector('#startTimerBtn'); 
  const countdownDisplay = document.querySelector('#countdownDisplay'); 
  const progressText = document.querySelector('.routine__progress p'); 
  const progressBar = document.querySelector('progress'); 

  let routineSteps = [];
  let routineCompletedDays = 0;
  let currentStepIndex = 0;
  let timer;

  // Add new step
  addStepBtn.addEventListener('click', () => {
    const stepName = prompt('Step name? (e.g. meditation, reading)');
    const duration = parseInt(prompt('Duration in minutes?'), 10);

    if (!stepName || isNaN(duration)) return;

    const stepData = { name: stepName, duration: duration * 60 };
    routineSteps.push(stepData);

    const stepElement = stepTemplate.content.cloneNode(true);
    stepElement.querySelector('.routine__step-name').textContent = stepName;
    stepElement.querySelector('.routine__step-duration').textContent = `${duration} min`;
    routineList.appendChild(stepElement);
  });

  // Starts wind down timer
  startTimerBtn.addEventListener('click', () => {
    if (routineSteps.length === 0) {
      alert('Add at least one routine step first.');
      return;
    }
    currentStepIndex = 0;
    runStep(routineSteps[currentStepIndex]);
  });

  function runStep(step) {
    let timeLeft = step.duration;
    alert(`Starting: ${step.name}`);

    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        currentStepIndex++;
        if (currentStepIndex < routineSteps.length) {
          runStep(routineSteps[currentStepIndex]);
        } else {
          finishRoutine();
        }
      } else {
        const mins = Math.floor(timeLeft / 60);
        const secs = timeLeft % 60;
        countdownDisplay.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        timeLeft--;
      }
    }, 1000);
  }

  function finishRoutine() {
    countdownDisplay.textContent = "Done!";
    alert("Great job! You've finished your routine.");
    routineCompletedDays++;

    if (progressBar && progressText) {
      progressBar.value = routineCompletedDays;
      progressText.innerHTML = `You’ve followed your routine <strong>${routineCompletedDays} out of 7 days</strong> this week!`;
    }

    if (routineCompletedDays === 7) {
      alert(" Challenge Complete! You've stuck to your routine for 7 days!");
    }
  }
});

*/