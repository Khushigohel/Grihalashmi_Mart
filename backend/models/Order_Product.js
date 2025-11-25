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

// ⭐ NEW: Tracking History Schema
const trackingSchema = new mongoose.Schema({
  status: String,
  date: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [itemSchema],
  total: { type: Number, required: true },
  deliveryAddress: addressSchema,

  date: { type: Date, default: Date.now },

  status: {
    type: String,
    default: "Pending",
    enum: [
      "Pending",
      "Packed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Cancelled"
    ]
  },

  // ⭐ NEW FIELD: Tracking history
  trackingHistory: {
    type: [trackingSchema],
    default: [],
  }
});

module.exports = mongoose.model("Order_Product", orderSchema);
