const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome to my server");
});

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(3000, () => {
  console.log("server running at port 3000");
});
