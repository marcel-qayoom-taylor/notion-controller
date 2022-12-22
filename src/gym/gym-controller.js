import {
  addItem,
  getPageById,
  getBlockById,
  appendBlockChildren,
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

  // Get the last page
  let previousPage = await getPreviousWorkoutPage(muscleGroup);

  // Get contents of last page and modify them to show it was the previous
  let contents = await getBlockById(previousPage.id);
  let customContents = await previousify(contents.results);

  // Create a new page and pre-fill the previous page's data
  let newPage = await addItem(titleCase(muscleGroup));
  appendBlockChildren(newPage.id, customContents);

  return newPage.url;
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

// the following function applies styling to make it obvious that the injected content is from the previous page
async function previousify(contents) {
  console.log(contents.length);
  for (let block in contents) {
    if (contents[block]?.type === "bulleted_list_item") {
      contents[block]["bulleted_list_item"]["rich_text"][0]["annotations"][
        "italic"
      ] = true;
      contents[block]["bulleted_list_item"]["rich_text"][0]["annotations"][
        "color"
      ] = "gray";
    }
  }
  return contents;
}
