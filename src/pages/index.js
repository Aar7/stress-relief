import "./index.css";
import { challengeList } from "../utils/challenges.js";
import Challenge from "../components/Challenge.js";
let numOfChallenges = 2;

const dailyChallenge = document.querySelector(".challenges__list");

// need to initialise the localStorage object if it is empty
if (getLocal("challengePoints")) {
  // other checks for localStorage items
} else {
  setLocal("challengePoints", 0);
}
function getLocal(item) {
  return localStorage.getItem(item);
}
function setLocal(item, content) {
  localStorage.setItem(item, content);
}

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

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

function getChallenges() {
  let selectedIndices = [];
  for (let i = 0; i < numOfChallenges; i++) {
    console.log(`Iteration: ${i}`);
    let randIndex = getRandomIndex(challengeList.length);
    while (selectedIndices.includes(randIndex)) {
      randIndex = getRandomIndex(challengeList.length);
    }

    const challenge = challengeList[randIndex];
    console.log(challenge);
    const challengeCard = new Challenge(
      challenge,
      handleClickCompleteChallenge
    );
    dailyChallenge.append(challengeCard.returnChallenge());
    selectedIndices.push(randIndex);
  }
}

getChallenges();
