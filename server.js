const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.send("Welcome to my server");
});

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("server running at port 3000");
});
