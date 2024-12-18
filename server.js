const express = require("express");
const db = require("./db");
const Person = require("./models/person.model");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
const app = express();

app.get("/", function (req, res) {
  res.send("Welcome to my server");
});

app.post("/person", (req, res) => {
  const data = req.body;

  const newPerson = new Person(data);
  // newPerson.name = data.name
});

app.listen(3000, () => {
  console.log("server running at port 3000");
});
