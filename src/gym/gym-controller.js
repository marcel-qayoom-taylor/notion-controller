import { addItem, getPage, getBlock } from "../notion-controller.js";

const allowedMuscleGroups = ["push", "pull", "legs", "cardio", "other"];

export default async function createGymPage(muscleGroup) {
  if (!allowedMuscleGroups.includes(muscleGroup)) {
    console.error(
      `Muscle group of ${muscleGroup} is not in ${allowedMuscleGroups}`
    );
    return "/";
  }
  let response = await addItem(muscleGroup);
  return response.url;
}
