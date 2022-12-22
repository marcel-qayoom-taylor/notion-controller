import { addItem, getPage, getBlock } from "../notion-controller.js";

const allowedMuscleGroups = ["push", "pull", "legs", "cardio", "other"];

export default async function createGymPage(muscleGroup) {
  if (!allowedMuscleGroups.includes(muscleGroup)) {
    console.error(
      `Muscle group of ${muscleGroup} is not in ${allowedMuscleGroups}`
    );
    return "/";
  }
  console.log(`Adding page ${titleCase(muscleGroup)}`);
  let response = await addItem(titleCase(muscleGroup));
  return response.url;
}

function titleCase(message) {
  let newMessage = message.toLowerCase().split(" ");
  for (let i = 0; i < newMessage.length; i++) {
    newMessage[i] =
      newMessage[i].charAt(0).toUpperCase() + newMessage[i].slice(1);
  }
  return newMessage.join(" ");
}
