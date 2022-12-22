import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import createGymPage from "./src/gym/gym-controller.js";

const app = express();
const port = 3000;

app.get("/gym/:muscleGroup", async (req, res) => {
  try {
    console.log(req.url);
    if (req.url != "/favicon.ico") {
      let url = await createGymPage(req.params.muscleGroup);
      res.redirect(url);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.get("/favicon.ico", (req, res) => {
  res.send("favicon");
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
