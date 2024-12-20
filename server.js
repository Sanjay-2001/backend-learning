const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();
const passport = require("./auth");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.use(passport.initialize());

app.get(
  "/",
  passport.authenticate("local", { session: false }),
  function (req, res) {
    res.send("Welcome to my server");
  }
);

app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

app.listen(PORT, () => {
  console.log("server running at port 3000");
});
