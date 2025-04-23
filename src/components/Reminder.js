export default class Reminder {
  constructor(name, handleDeleteStep) {
    this._name = name;
    // this._difficulty = difficulty;
    this._handleDeleteStep = handleDeleteStep;
    this._reminderTemplate = document
      .querySelector("#add-reminder")
      .content.querySelector(".reminder")
      .cloneNode(true);
    this._templateName =
      this._reminderTemplate.querySelector(".reminder__name");
    this._deleteButton = this._reminderTemplate.querySelector(
      ".reminder__delete-button"
    );
    this._doneButton = this._reminderTemplate.querySelector(
      ".reminder__done-button"
    );
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteStep(this);
    });
    this._doneButton.addEventListener("click", (e) => {
      this._reminderTemplate.style.textDecoration =
        this._reminderTemplate.style.textDecoration === "line-through"
          ? "none"
          : "line-through";
    });
  }

  deleteCard() {
    this._reminderTemplate.remove();
  }

  returnReminder() {
    this._setEventListeners();
    this._templateName.textContent = this._name;

    return this._reminderTemplate;
  }
}
