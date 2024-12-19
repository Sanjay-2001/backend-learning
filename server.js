const express = require("express");
const db = require("./db");

const bodyParser = require("body-parser");
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/person.model");

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

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received credentials: ", username, password);
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "Incorrect username." });
      const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect password." });
      }
    } catch (err) {
      return done(err);
    }
  })
);

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
