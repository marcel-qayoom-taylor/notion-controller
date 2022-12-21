const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/gym/push", (req, res) => {
  res.send("Push day!");
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
