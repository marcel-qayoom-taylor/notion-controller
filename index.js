import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import createGymPage from "./src/gym/gym-controller.js";

const app = express();
const port = 3000;

app.use("/gym", createGymPage);

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
