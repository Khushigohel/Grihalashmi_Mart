// backend/router/admin/adminStats.js
const express = require("express");
const router = express.Router();
const Product = require("../../models/Product");
const Order = require("../../models/Order");
const User = require("../../models/User"); // only if you have a User model

// GET admin statistics
router.get("/", async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    const userCount = await User.countDocuments();

    res.json({
      success: true,
      products: productCount,
      orders: orderCount,
      users: userCount,
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
