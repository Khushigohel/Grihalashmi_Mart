const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
  name: String,
  price: Number,
  qty: Number,
  image: String,
});

const addressSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  address: String,
  Pincode: String,
  City: String,
  State: String,
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [itemSchema],
  total: { type: Number, required: true },
  deliveryAddress: addressSchema,
  date: { type: Date, default: Date.now },
  status: { type: String, default: "pending" } // optional
});
module.exports = mongoose.model("Order_Product", orderSchema);
