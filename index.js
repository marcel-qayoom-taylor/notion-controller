import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import createGymPage from "./src/gym/gym-controller.js";
import path from "path";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(ignoreFavicon);

function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}

// app.use("/gym", createGymPage);
app.get("/gym/:muscleGroup", async (req, res) => {
  try {
    if (req.url != "/favicon.ico") {
      let url = await createGymPage(req.params.muscleGroup);
      res.redirect(url);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
