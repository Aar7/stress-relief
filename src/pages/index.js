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



