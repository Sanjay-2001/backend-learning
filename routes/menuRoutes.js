const express = require("express");

const Menu = require("../models/menu.model");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();
    res.status(200).json(data);
  } catch (err) {
    console.log("error : ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:dietType", async (req, res) => {
  try {
    const data = req.params.dietType;
    console.log(data);
    if (data == "Veg" || data == "NonVeg") {
      const response = await Menu.find({ diet: data });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid work type" });
    }
  } catch (error) {
    console.log("error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    const response = await newMenu.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log("error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
