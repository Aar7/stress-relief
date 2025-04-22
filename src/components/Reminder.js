export default class Reminder {
  constructor(name, handleDeleteReminder) {
    this._name = name;
    // this._difficulty = difficulty;
    this._handleDeleteReminder = handleDeleteReminder;
    this._reminderTemplate = document
      .querySelector("#add-reminder")
      .content.querySelector(".reminder")
      .cloneNode(true);
    this._templateName =
      this._reminderTemplate.querySelector(".reminder__name");
    this._deleteButton = this._reminderTemplate.querySelector(
      ".reminder__delete-button"
    );
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteReminder(this);
    });
    this._templateName.addEventListener("click", (e) => {
      console.log("Event");
      console.log(e.target.tagName);
      if (e.target.tagName === "P") {
        e.target.style.textDecoration =
          e.target.style.textDecoration === "line-through"
            ? "none"
            : "line-through";
      }
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
