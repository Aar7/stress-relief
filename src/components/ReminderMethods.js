import Reminder from "./Reminder";

// method to add a reminder
export function setReminder(
  newReminder,
  setReminderBtn,
  buttonCallBack,
  remindersList
) {
  // setReminderBtn.addEventListener("click", () => {
  // const newReminder = prompt("Enter your reminder:");
  console.log(newReminder);
  console.log(buttonCallBack);
  console.log(remindersList);
  if (newReminder) {
    const reminderCard = new Reminder(newReminder, buttonCallBack);

    remindersList.append(reminderCard.returnReminder());
  }
  // });
}
