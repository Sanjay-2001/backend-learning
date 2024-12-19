const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  dish: {
    type: String,
    required: true,
  },
  diet: {
    type: String,
    enum: ["Veg", "NonVeg"],
  },
  price: {
    type: Number,
  },
  quantity: {
    type: String,
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
