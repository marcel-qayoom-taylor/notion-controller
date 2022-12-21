import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "@notionhq/client";
import express from "express";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function addItem(text) {
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
    console.log("Success! Entry added.");
    return response;
  } catch (error) {
    console.error(error.body);
  }
}

export async function getPage(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function getBlock(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response;
}
