export default class Challenge {
  constructor({ name, difficulty }, handleClickCompleteChallenge) {
    this._name = name;
    this._difficulty = difficulty;
    this._handleClickCompleteChallenge = handleClickCompleteChallenge;
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

  _setEventListeners() {
    this._completeButton.addEventListener("click", () => {
      this._handleClickCompleteChallenge(this);
    });
  }

  returnChallenge() {
    this._setEventListeners();
    this._templateName.textContent = this._name;

    return this._challengeTemplate;
  }
}
