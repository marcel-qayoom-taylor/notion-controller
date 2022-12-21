import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "@notionhq/client";
import express from "express";

const app = express();
const port = 3000;
const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

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

let url = await addItem("Yurts in Big Sur, California");

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/gym/push", (req, res) => {
  res.redirect(url);
});

app.get("/gym/pull", (req, res) => {
  res.send("Pull day!");
});

app.get("/gym/legs", (req, res) => {
  res.send("Legs day!");
});

app.get("/gym/cardio", (req, res) => {
  res.send("Cardio day!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
