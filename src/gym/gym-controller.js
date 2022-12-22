import {
  addItem,
  updatePage,
  getPageById,
  getBlockById,
  appendBlockChildren,
  queryDatabase,
} from "../notion-controller.js";
import moment from "moment";
import express from "express";
const router = express.Router();

const allowedMuscleGroups = ["push", "pull", "legs", "cardio", "other"];

/**
 * Create Notion Pages
 *
 * @return createGymPage | empty
 */
// router.get("/:muscleGroup", async (req, res) => {
//   try {
//     if (req.url != "/favicon.ico") {
//       let url = await createGymPage(req.params.muscleGroup);
//       res.redirect(url);
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).send(error);
//   }
// });

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

  // Create a new page and set page properties
  let newPage = await addItem(titleCase(muscleGroup));

  updatePage(
    newPage.id,
    {
      Tags: {
        multi_select: [
          {
            name: muscleGroup,
          },
        ],
      },
      Date: {
        date: {
          start: moment().format("YYYY-MM-DD"),
        },
      },
    },
    calculateEmoji(muscleGroup)
  );

  // Pre-fill the previous page's data
  appendBlockChildren(newPage.id, customContents);

  return newPage.url;
}

// Helper function to Title Case names
function titleCase(message) {
  let newMessage = message.toLowerCase().split(" ");
  for (let i = 0; i < newMessage.length; i++) {
    newMessage[i] =
      newMessage[i].charAt(0).toUpperCase() + newMessage[i].slice(1);
  }
  return newMessage.join(" ");
}

async function getPreviousWorkoutPage(muscleGroup) {
  console.log(`Finding previous page for ${muscleGroup}`);
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

function calculateEmoji(muscleGroup) {
  let emoji = {
    type: "emoji",
    emoji: null,
  };
  let workoutEmojis = {
    push: "🧿",
    pull: "🦾",
    legs: "🏋️‍♂️",
    cardio: "🏃‍♂️",
  };
  emoji["emoji"] = workoutEmojis[muscleGroup];
  return emoji;
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
