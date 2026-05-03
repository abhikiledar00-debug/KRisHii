const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  farmerId: String
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);