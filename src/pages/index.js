import "./index.css";
import { challengeList } from "../utils/challenges.js";
import {
  checkDayStreak,
  checkLocalStorage,
  getChallenges,
  getLocal,
  setLocal,
} from "../components/ChallengeMethods.js";
import { setReminder } from "../components/ReminderMethods.js";
import {
  dailyChallengeList,
  remindersList,
  setReminderBtn,
  ratingInput,
  submitRatingBtn,
  countdownDisplay,
  startBtn,
  pauseBtn,
  stopBtn,
  routineList,
  addStepBtn,
  deleteStepBtn,
  stepTemplate,
} from "../utils/domElements.js";
let numOfChallenges = 3;
const today = new Date();

// need to initialise the localStorage object if it is empty
checkLocalStorage();
checkDayStreak(today);

// function toggleButtonState(challengeComplete, challenge) {
//   if (challengeComplete) {
//     challenge._completeButton.textContent = "Challenge complete!";
//     challenge._completeButton.classList.add(
//       "challenge__complete-button_inactive"
//     );
//     challenge._completeButton.setAttribute("disabled", "");
//   }
// }

function handleClickCompleteChallenge(challenge) {
  // console.log("Inside click-to-complete handler");
  // console.log(challenge.challengeID);
  challenge.toggleButtonState(true);
  const temp = JSON.parse(getLocal("todayChallenges"));
  console.log(temp);
  temp.forEach((item) => {
    if (item.challengeID == challenge.challengeID) {
      item.challengeComplete = !item.challengeComplete;
    }
  });
  setLocal("todayChallenges", JSON.stringify(temp));

  // challenge._completeButton.textContent = "Challenge complete!";
  // challenge._completeButton.classList.add(
  //   "challenge__complete-button_inactive"
  // );
  // challenge._completeButton.setAttribute("disabled", "");
  const diff = challenge._difficulty;
  alert(
    `You've earned ${diff} ${
      diff == 1 ? "point" : "points"
    } for completing this challenge!`
  );
  // console.log(diff);
  setLocal("challengePoints", JSON.parse(getLocal("challengePoints")) + diff);
}

getChallenges(
  challengeList,
  numOfChallenges,
  dailyChallengeList,
  handleClickCompleteChallenge
);

console.log(localStorage);
// localStorage.clear();
// === Routine Steps ===

addStepBtn.addEventListener("click", () => {
  const stepName = prompt("Enter the step name:");
  const duration = prompt("Enter duration ( 5 minutes):");

  if (stepName && duration) {
    const clone = stepTemplate.content.cloneNode(true);
    const nameSpan = clone.querySelector(".routine__step-name");
    const durationSpan = clone.querySelector(".routine__step-duration");

    if (nameSpan && durationSpan) {
      nameSpan.textContent = stepName;
      durationSpan.textContent = duration;
      routineList.appendChild(clone);
    } else {
      console.error("Missing .routine__step-name or .routine__step-duration");
    }
  }

  // === Timer ===
  let timeLeft = 300; // 5 minutes in seconds
  const countdownDisplay = document.querySelector("#countdownDisplay");

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }
});

deleteStepBtn.addEventListener("click", () => {
  if (routineList.lastElementChild) {
    routineList.removeChild(routineList.lastElementChild);
  }
});

// === Timer ===
let countdownInterval;
let timeLeft = 300; // 5 minutes in seconds

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  countdownDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
    } else {
      clearInterval(countdownInterval);
      alert("Timer complete!");
    }
  }, 1000);
}

updateTimerDisplay();

// === Reminders ===

function handleDeleteReminder(reminder) {
  // console.log(reminder);
  reminder.deleteCard();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", () => clearInterval(countdownInterval));
stopBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  timeLeft = 300;
  updateTimerDisplay();
});

setReminderBtn.addEventListener("click", () => {
  console.log("Set reminder button pressed");
  const newReminder = prompt("Enter your reminder:");
  setReminder(newReminder, setReminderBtn, handleDeleteReminder, remindersList);
});

// === Sleep Quality Rating ===
submitRatingBtn.addEventListener("click", () => {
  const rating = ratingInput.value;
  if (rating >= 1 && rating <= 10) {
    alert(`Thanks for rating your sleep: ${rating}/10`);
  } else {
    alert("Please enter a number between 1 and 10.");
  }
});
