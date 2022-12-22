import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import createGymPage from "./src/gym/gym-controller.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/gym/:muscleGroup", async (req, res) => {
  let url = await createGymPage(req.params.muscleGroup);
  res.redirect(url);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
