const express = require("express");
const router = express.Router();
const Order = require("../../models/Order"); // create model below

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.productId", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update order status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

module.exports = router;
