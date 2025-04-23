export default class RoutineStep {
  constructor(name, duration, handleDeleteStep, handleDoneStep) {
    this._name = name;
    this._duration = duration;
    this._handleDeleteStep = handleDeleteStep;
    this._handleDoneStep = handleDoneStep;

    this._routineTemplate = document
      .querySelector("#add-routine-step")
      .content.querySelector(".routine__step")
      .cloneNode(true);
    this._templateName = this._routineTemplate.querySelector(
      ".routine__step-name"
    );
    this._templateDuration = this._routineTemplate.querySelector(
      ".routine__step-duration"
    );
    this._deleteButton = this._routineTemplate.querySelector(
      ".routine__step-delete-btn"
    );
    this._doneButton = this._routineTemplate.querySelector(
      ".routine__step-done-btn"
    );
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteStep(this);
    });
    this._doneButton.addEventListener("click", () => {
      this._handleDoneStep(this);
    });
  }

  deleteCard() {
    this._routineTemplate.remove();
  }

  returnReminder() {
    this._setEventListeners();
    this._templateName.textContent = this._name;
    this._templateDuration.textContent = this._duration;

    return this._routineTemplate;
  }
}
