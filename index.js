import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "@notionhq/client";
import express from "express";
import createGymPage from "./src/gym/gym-controller.js";

const app = express();
const port = 3000;
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

// app.use(express.static("src/gym")); // temp for testing until I use argument based routing

async function addItem(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    console.log("Success! Entry added.");
    return response.url;
  } catch (error) {
    console.error(error.body);
  }
}

async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  console.log(response);
}

async function getBlock(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  console.log(response);
}

let pushUrl = createGymPage("push");
console.log(`Push url is ${pushUrl}`);
// let pullUrl = await addItem("Pull Day");
// let legsUrl = await addItem("Legs Day");
// let cardioUrl = await addItem("Cardio Day");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/gym/push", (req, res) => {
  // res.redirect(pushUrl);
});

app.get("/gym/pull", (req, res) => {
  res.redirect(pullUrl);
});

app.get("/gym/legs", (req, res) => {
  res.redirect(legsUrl);
});

app.get("/gym/cardio", (req, res) => {
  res.redirect(cardioUrl);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
