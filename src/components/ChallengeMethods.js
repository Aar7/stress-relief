import Challenge from "./Challenge";

/**
 * Performs checks to determine if certain necessary variables are stored in localStorage,
 * and initialises those variables if they are absent.
 * @param {function} getLocal
 * @param {function} setLocal
 */
export function checkLocalStorage() {
  if (!getLocal("challengePoints")) {
    setLocal("challengePoints", 0);
  }

  if (!getLocal("todayChallenges")) {
    setLocal("todayChallenges", JSON.stringify([]));
  }

  if (!getLocal("date")) {
    setLocal("date", new Date());
  }

  if (!getLocal("streak")) {
    setLocal("streak", 1);
  }
}

export function getLocal(item) {
  return localStorage.getItem(item);
}

export function setLocal(item, content) {
  localStorage.setItem(item, content);
}

function createChallenge(challengeList, index, buttonCallback, domNodeList) {
  const challenge = challengeList[index];

  const challengeCard = new Challenge(challenge, buttonCallback);
  domNodeList.append(challengeCard.returnChallenge());
}

/**
 * Sets the day's challenges if they are not already set in localStorage; otherwise, it just re-loads the same challenges from localstorage and whether they have been completed
 * @param {object} challengeList
 * @param {int} numOfChallenges
 * @param {node} dailyChallengeList
 * @param {function} handleClickCompleteChallenge
 */
export function getChallenges(
  challengeList,
  numOfChallenges,
  dailyChallengeList,
  handleClickCompleteChallenge
) {
  // if todayChallenges.length from LS is zero, create new daily challenges
  const todayChallenges = JSON.parse(getLocal("todayChallenges"));

  let selectedIndices = [];

  if (todayChallenges.length == 0) {
    // set random new challenges
    for (let i = 0; i < numOfChallenges; i++) {
      let randIndex = getRandomIndex(challengeList.length);

      // loop that checks if a challenge has already been selected
      while (selectedIndices.includes(randIndex)) {
        randIndex = getRandomIndex(challengeList.length);
      }

      createChallenge(
        challengeList,
        randIndex,
        handleClickCompleteChallenge,
        dailyChallengeList
      );
      selectedIndices.push(randIndex);
    }

    // set the existing challenges here so they don't reset within 24 hours of appearing
    setLocal("todayChallenges", JSON.stringify(selectedIndices));
  } else {
    todayChallenges.forEach((item) => {
      createChallenge(
        challengeList,
        item,
        handleClickCompleteChallenge,
        dailyChallengeList
      );
      selectedIndices.push(item);
    });
  }
}

/**
 * Gets a random number that depends on `length`. In this case, `length` is the length of `challengeList`
 * @param {int} length
 * @returns int
 */
function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

export function checkDayStreak(today) {
  // there are 86,400,000 ms in one day
  const lastLoginDay = new Date(getLocal("date")); // pars string into date object
  const epochLastLoginDay = Date.parse(lastLoginDay); // convert date obj into epoch representation
  const epochtoday = Date.parse(today);
  const dateDifference = epochtoday - epochLastLoginDay;
  const streak = JSON.parse(getLocal("streak"));

  if (172800000 > dateDifference > 86400000) {
    // streak increases only after 24 hours, but less than 48 hours have passed
    setLocal("date", new Date()); // set streak checkpoint
    setLocal("streak", streak + 1); // increase streak by 1
  } else if (dateDifference > 172800000) {
    // re-set streak to zero, reset challenge array in localStorage to empty
    setLocal("date", new Date()); // set streak checkpoint
    setLocal("streak", 1); // set streak to 1

    setLocal("todayChallenges", JSON.stringify([]));
  }
}
