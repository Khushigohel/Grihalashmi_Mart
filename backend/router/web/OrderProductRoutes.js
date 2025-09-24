const express = require("express");
const router = express.Router();
const Order = require("../../models/Order_Product");
const Cart=require("../../models/Cart");

// -----------------------------------
// PLACE ORDER
// POST /api/orders/place-order
// -----------------------------------
router.post("/place-order", async (req, res) => {
  try {
    const { userId, items, total, deliveryAddress } = req.body;

    if (!userId || !items || items.length === 0 || !total || !deliveryAddress) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newOrder = new Order({
      userId,
      items,
      total,
      deliveryAddress,
    });

    await newOrder.save();

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

// -----------------------------------
// GET ALL ORDERS OF A USER
// GET /api/orders/:userId
// -----------------------------------
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ date: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// -----------------------------------
// UPDATE ORDER STATUS (optional)
// PATCH /api/orders/:orderId/status
// -----------------------------------
router.patch("/:orderId/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Status updated", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
