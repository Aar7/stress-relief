export default class Challenge {
  constructor(
    { name, difficulty },
    id,
    handleClickCompleteChallenge,
    challengeComplete
  ) {
    this._name = name;
    this._difficulty = difficulty;
    this.challengeID = id;
    this._handleClickCompleteChallenge = handleClickCompleteChallenge;
    this._challengeComplete = challengeComplete;
    this._challengeTemplate = document
      .querySelector("#add-challenge")
      .content.querySelector(".challenge")
      .cloneNode(true);
    this._templateName =
      this._challengeTemplate.querySelector(".challenge__title");
    this._completeButton = this._challengeTemplate.querySelector(
      ".challenge__complete-button"
    );
  }

  toggleButtonState(toggle) {
    console.log(this._challengeComplete);
    console.log(toggle);
    console.log(this._challengeComplete | toggle);
    // console.log("Inside toggleButtonState");
    // console.log(this._challengeComplete);
    // this._challengeComplete = !this._challengeComplete;
    // console.log(this._challengeComplete);
    if (this._challengeComplete | toggle) {
      console.log(this._challengeComplete);
      this._completeButton.textContent = "Challenge complete!";
      this._completeButton.classList.add("challenge__complete-button_inactive");
      this._completeButton.setAttribute("disabled", "");
    }
  }

  _setCompletedState() {
    if (this._challengeComplete) {
      this.toggleButtonState();
    }
  }

  _setEventListeners() {
    this._completeButton.addEventListener("click", () => {
      this._handleClickCompleteChallenge(this);
    });
  }

  returnChallenge() {
    this._setEventListeners();
    this.toggleButtonState();
    this._templateName.textContent = this._name;

    return this._challengeTemplate;
  }
}
