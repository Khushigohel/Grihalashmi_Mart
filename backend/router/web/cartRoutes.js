const express = require("express");
const router = express.Router();
const verifyToken = require("../../middlewar/authmiddlewar");
const { getCart, addToCart, updateCart, removeFromCart } = require("../../controller/cartController");

router.get("/", verifyToken, getCart);
router.post("/", verifyToken, addToCart);
router.put("/", verifyToken, updateCart);
router.delete("/:productId", verifyToken, removeFromCart);

module.exports = router;
