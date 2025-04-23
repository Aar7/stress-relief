import RoutineStep from "./RoutineStep";

export function setRoutineItem(
  routineName,
  routineDuration,
  routineList,
  handleDeleteStep,
  handleDoneStep
) {
  const routineCard = new RoutineStep(
    routineName,
    routineDuration,
    handleDeleteStep,
    handleDoneStep
  );
  routineList.append(routineCard.returnReminder());
}
