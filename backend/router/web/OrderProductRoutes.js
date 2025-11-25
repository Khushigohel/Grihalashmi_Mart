const express = require("express");
const router = express.Router();
const Order = require("../../models/Order_Product");
const Cart = require("../../models/Cart");

// -----------------------------
// ✅ 1. Count Orders & Payments (Keep this first!)
// -----------------------------
router.get("/countOrder", async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    // Sum of only paid orders
    const totalPayments = await Order.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: null, totalAmount: { $sum: "$total" } } },
    ]);

    res.status(200).json({
      success: true,
      totalOrders,
      totalPayments: totalPayments[0]?.totalAmount || 0,
    });
  } catch (error) {
    console.error("Error counting orders:", error);
    res.status(500).json({ success: false, message: "Failed to count orders" });
  }
});

// -----------------------------
// Place Order
// -----------------------------
router.post("/place-order", async (req, res) => {
  try {
    const { userId, items, total, deliveryAddress } = req.body;

    if (!userId || !items || items.length === 0 || !total || !deliveryAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({ userId, items, total, deliveryAddress });
    await newOrder.save();

    // Clear user cart after placing order
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------
// Get All Orders
// -----------------------------
router.get("/all", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// -----------------------------
// Get Orders by User ID
// -----------------------------
router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 🛡 Prevent invalid ObjectId crash
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const orders = await Order.find({ userId }).sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// -----------------------------
// 📦 Update Order Status + Add Tracking History
// -----------------------------
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // update status
    order.status = status;

    // push tracking update
    order.trackingHistory.push({
      status,
      date: new Date(),
    });

    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// GET: Track Order
router.get("/track/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});



module.exports = router;
