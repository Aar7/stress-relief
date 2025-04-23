import "./index.css";
import badge50 from "../images/badge-streak-50.svg";
import { badgeList, challengeList } from "../utils/constants.js";
import {
  checkDayStreak,
  checkLocalStorage,
  getChallenges,
  getLocal,
  setLocal,
} from "../components/ChallengeMethods.js";
import { setReminder } from "../components/ReminderMethods.js";
import { setRoutineItem } from "../components/RoutineStepMethods.js";
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
checkStreakBadge();

function checkStreakBadge() {
  // console.warn("In check streak");
  /*
  If streak is 1,3,5,10,20,50,75,100,365, display that badge for the user
  - check localstorage to determine if the user has earned that badge
  */
  const streak = JSON.parse(getLocal("streak"));
  const badge = badgeList.find((element) => {
    return streak >= element;
  });

  console.log(`badge: ${badge}`);

  if (badge != undefined) {
    // award badge here
    const badgesNode = document
      .querySelector("#add-badge")
      .content.querySelector(".badges__image")
      .cloneNode(true);
    const badgesSection = document.querySelector(".badges");

    // badgesNode.setAttribute("src", `./images/badge-streak-${badge}.svg`);
    badgesNode.src = badge50;
    // badgesNode.setAttribute("src", "<%=badge50%>");
    console.log(badgesSection);
    console.log(badgesNode);
    badgesSection.append(badgesNode);

    // console.log(badgesNode);
  }
}

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

/**
 * Used in any section where a reminder-like item needs to be deleted. Deletes that object
 * @param {object} step
 */
function handleDeleteStep(step) {
  step.deleteCard();
}

function handleDoneStep(step) {
  console.log(step);
  step._routineTemplate.style.textDecoration =
    step._routineTemplate.style.textDecoration === "line-through"
      ? "none"
      : "line-through";
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

// deleteStepBtn.addEventListener("click", () => {
//   if (routineList.lastElementChild) {
//     routineList.removeChild(routineList.lastElementChild);
//   }
// });

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

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", () => clearInterval(countdownInterval));
stopBtn.addEventListener("click", () => {
  clearInterval(countdownInterval);
  timeLeft = 300;
  updateTimerDisplay();
});

addStepBtn.addEventListener("click", () => {
  let stepName;
  let duration;
  while (!stepName) {
    stepName = prompt("What do you want to do?");
  }
  while (!duration /* && !isNaN(Number(duration)) */) {
    duration = prompt(`For how long to you want to ${stepName}?`);
  }

  if (stepName && duration) {
    // const stepNode = stepTemplate.content.cloneNode(true);
    // const nameSpan = stepNode.querySelector(".routine__step-name");
    // const durationSpan = stepNode.querySelector(".routine__step-duration");

    // if (nameSpan && durationSpan) {
    //   nameSpan.textContent = stepName;
    //   durationSpan.textContent = duration;
    //   routineList.appendChild(stepNode);
    // } else {
    //   console.error("Missing .routine__step-name or .routine__step-duration");
    // }
    setRoutineItem(
      stepName,
      duration,
      routineList,
      handleDeleteStep,
      handleDoneStep
    );
  }
});

setReminderBtn.addEventListener("click", () => {
  console.log("Set reminder button pressed");
  const newReminder = prompt("Enter your reminder:");
  setReminder(newReminder, setReminderBtn, handleDeleteStep, remindersList);
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
