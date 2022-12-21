import { addItem, getPage, getBlock } from "../notion-controller.js";

export default async function createGymPage(muscleGroup) {
  let response = await addItem(muscleGroup);
  console.log(`Here's the response from gym controller file: ${response}`);
  return response.url;
}
