import "./index.css";
import { challengeList } from "../utils/challenges.js";
import {
  checkDayStreak,
  checkLocalStorage,
  getChallenges,
  getLocal,
  setLocal,
} from "../components/ChallengeMethods.js";
import { dailyChallengeList } from "../utils/domElements.js";
// import Challenge from "../components/Challenge.js";
let numOfChallenges = 3;
const today = new Date();

// need to initialise the localStorage object if it is empty
checkLocalStorage();
checkDayStreak(today);

function handleClickCompleteChallenge(challenge) {
  challenge._completeButton.textContent = "Challenge complete!";
  challenge._completeButton.classList.add(
    "challenge__complete-button_inactive"
  );
  challenge._completeButton.setAttribute("disabled", "");
  const diff = challenge._difficulty;
  alert(
    `You've earned ${diff} ${
      diff == 1 ? "point" : "points"
    } for completing this challenge!`
  );
  console.log(diff);
  setLocal("challengePoints", JSON.parse(getLocal("challengePoints")) + diff);
}

getChallenges(
  challengeList,
  numOfChallenges,
  dailyChallengeList,
  handleClickCompleteChallenge
);

console.log(localStorage);



document.addEventListener("DOMContentLoaded", () => {
  // === Routine Step Builder ===
  const routineList = document.getElementById("routineList");
  const addStepBtn = document.getElementById("addStep-Btn");
  const deleteStepBtn = document.getElementById("deleteRotine-Btn");
  const routineTemplate = document.getElementById("routine-step-template");

  addStepBtn.addEventListener("click", () => {
    const clone = routineTemplate.content.cloneNode(true);
    routineList.appendChild(clone);
  });

  deleteStepBtn.addEventListener("click", () => {
    if (routineList.lastElementChild) {
      routineList.removeChild(routineList.lastElementChild);
    }
  });

  let countdownInterval;
  let timeLeft = 300; // 5 minutes in seconds
  const countdownDisplay = document.querySelectorAll("#countdownDisplay")[0];
  const startBtn = document.getElementById("startTimer-Btn");
  const pauseBtn = document.getElementById("pauseTimer-Btn");
  const stopBtn = document.getElementById("stopTimer-Btn");

  function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    countdownDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
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

  startBtn.addEventListener("click", () => startTimer());

  pauseBtn.addEventListener("click", () => clearInterval(countdownInterval));

  stopBtn.addEventListener("click", () => {
    clearInterval(countdownInterval);
    timeLeft = 300;
    updateTimerDisplay();
  });

  updateTimerDisplay();

  // === Reminder Buttons ===
  const setReminderBtn = document.getElementById("setReminder-Btn");
  const deleteReminderBtn = document.getElementById("deleteReminder-Btn");
  const completedReminderBtn = document.getElementById("CompletedRemindernpBtn");
  const reminderList = document.querySelector(".routine__reminders ul");

  setReminderBtn.addEventListener("click", () => {
    const newReminder = prompt("Enter your reminder:");
    if (newReminder) {
      const li = document.createElement("li");
      li.textContent = newReminder;
      reminderList.appendChild(li);
    }
  });

// Add this after you populate the reminder list
reminderList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.style.textDecoration =
      e.target.style.textDecoration === "line-through" ? "none" : "line-through";
  }
});



  deleteReminderBtn.addEventListener("click", () => {
    if (reminderList.lastElementChild) {
      reminderList.removeChild(reminderList.lastElementChild);
    }
  });

  completedReminderBtn.addEventListener("click", () => {
    const firstReminder = reminderList.querySelector("li");
    if (firstReminder) {
      firstReminder.style.textDecoration = "line-through";
    }
  });

  // === Sleep Quality Rating ===
  const ratingInput = document.querySelector('input[type="number"]');
  const submitRatingBtn = document.getElementById("submitRating-Btn");

  submitRatingBtn.addEventListener("click", () => {
    const rating = ratingInput.value;
    if (rating >= 1 && rating <= 10) {
      alert(`Thanks for rating your sleep: ${rating}/10`);
    } else {
      alert("Please enter a number between 1 and 10.");
    }
  });

  // === Daily Challenge Complete Button ===
  const challengeTemplate = document.getElementById("add-challenge");
  const challengesList = document.querySelector(".challenges__list");

  // Example challenge (you can use dynamic data later)
  const challengeClone = challengeTemplate.content.cloneNode(true);
  challengeClone.querySelector(".challenge__title").textContent = "Drink water after waking up";
  const completeBtn = challengeClone.querySelector(".challenge__complete-button");
  completeBtn.addEventListener("click", () => {
    completeBtn.textContent = "Completed ✅";
    completeBtn.disabled = true;
  });

  challengesList.appendChild(challengeClone);
});


const addStepBtn = document.getElementById("addStep-Btn");
const routineList = document.getElementById("routineList");
const stepTemplate = document.getElementById("routine-step-template");

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
    } else {
      console.error("Could not find .routine__step-name or .routine__step-duration");
    }

    routineList.appendChild(clone);
  }
});




