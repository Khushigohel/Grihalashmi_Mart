// routes/payment.js
const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment"); // Payment model

// Get all payments
router.get("/", async (req, res) => {
  try {
    const payments = await Payment.find().populate("userId", "name email"); // populate user info if needed
    res.json(
      payments.map((p) => ({
        _id: p._id,
        userName: p.userId.name,
        orderId: p.orderId,
        amount: p.amount,
        status: p.status,
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
