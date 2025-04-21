import "./index.css";
import { challengeList } from "../utils/challenges.js";
import Challenge from "../components/Challenge.js";
let numOfChallenges = 10;

const dailyChallenge = document.querySelector(".challenges__list");

function handleClickCompleteChallenge(challenge) {
  alert("Challenge complete!");
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
