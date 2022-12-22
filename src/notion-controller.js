import * as dotenv from "dotenv";
dotenv.config();
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function addItem(name, icon, extraProperties) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      icon: icon,
      properties: {
        title: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        ...extraProperties,
      },
    });
    console.log("Success! Entry added.");
    return response;
  } catch (error) {
    console.error(error.body);
  }
}

export async function getBlockById(blockId) {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    });
    return response;
  } catch (error) {
    console.error(error.body);
  }
}

export async function appendBlockChildren(blockId, children) {
  try {
    const response = await notion.blocks.children.append({
      block_id: blockId,
      children: children,
    });
  } catch (error) {
    console.error(error.body);
  }
}

export async function queryDatabase(filter, sorts) {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: filter,
      sorts: sorts,
    });
    return response;
  } catch (error) {
    console.error(error.body);
  }
}
