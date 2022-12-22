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

export async function getPageById(pageId) {
  const response = await notion.pages.retrieve({ page_id: pageId });
  return response;
}

export async function getBlockById(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response;
}

export async function appendBlockChildren(blockId, children) {
  const response = await notion.blocks.children.append({
    block_id: blockId,
    children: children,
  });
}

export async function queryDatabase(filter, sorts) {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: filter,
    sorts: sorts,
  });
  return response;
}

export async function updatePage(pageId, properties, icon) {
  const response = await notion.pages.update({
    page_id: pageId,
    icon: icon,
    properties: properties,
  });
  return response;
}
