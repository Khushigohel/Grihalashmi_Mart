const express = require("express");
const router = express.Router();
const Cart = require("../../models/Cart");
const Address = require("../../models/Address");

// Get checkout details
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch cart items for this user
    const cartItems = await Cart.find({ userId }).populate("productId");

    // Fetch saved addresses
    const addresses = await Address.find({ userId });

    res.json({
      success: true,
      cartItems,
      addresses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Place order
router.post("/place-order", async (req, res) => {
  try {
    const { userId, addressId, cartItems } = req.body;

    // (Here you can save order in an Order collection)
    const order = {
      userId,
      addressId,
      items: cartItems,
      status: "Pending",
      createdAt: new Date(),
    };

    // TODO: Save to "Order" collection in DB
    // await new Order(order).save();

    // Empty the cart after placing order
    await Cart.deleteMany({ userId });

    res.json({ success: true, message: "Order placed successfully!", order });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
});

module.exports = router;
