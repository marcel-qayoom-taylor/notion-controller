import {
  addItem,
  getPageById,
  getBlockById,
  queryDatabase,
} from "../notion-controller.js";

const allowedMuscleGroups = ["push", "pull", "legs", "cardio", "other"];

export default async function createGymPage(muscleGroup) {
  if (!allowedMuscleGroups.includes(muscleGroup)) {
    console.error(
      `Muscle group of ${muscleGroup} is not in ${allowedMuscleGroups}`
    );
    return "/";
  }
  let previousPage = await getPreviousWorkoutPage(muscleGroup);
  let contents = await getBlockById(previousPage.id);
  console.log(`CONTENTS OF MOST RECENT PAGE: ${JSON.stringify(contents)}`);
  // create new page
  let newPage = await addItem(titleCase(muscleGroup));
  // newPage.update(contents)
  // fill new page with previous contents
  return "/";

  // console.log(`Adding page ${titleCase(muscleGroup)}`);

  // return response.url;
}

function titleCase(message) {
  let newMessage = message.toLowerCase().split(" ");
  for (let i = 0; i < newMessage.length; i++) {
    newMessage[i] =
      newMessage[i].charAt(0).toUpperCase() + newMessage[i].slice(1);
  }
  return newMessage.join(" ");
}

async function getPreviousWorkoutPage(muscleGroup) {
  console.log(`Looking for ${muscleGroup}`);
  let filter = {
    property: "Tags",
    multi_select: {
      contains: muscleGroup,
    },
  };
  let sorts = [
    {
      property: "Date",
      direction: "descending",
    },
  ];
  let query = await queryDatabase(filter, sorts);
  return query.results?.length > 0 ? query.results[0] : null;
}
