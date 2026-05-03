const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema({

    productName: String,

    quantity: Number,

    price: Number,

    retailerName: String,

    transporter: {
      type: String,
      default: ""
    },

    status: {
      type: String,
      default: "Pending"
    }

  }, {
    timestamps: true
  });

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );