const Cart = require("../models/Cart");
const Product = require("../models/Product"); // ✅ FIX: import Product model

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate("products.productId");
    if (!cart) return res.json({ products: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// POST add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ success: false, message: "Product ID is required" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    let cart = await Cart.findOne({ userId: req.userId });
    if (!cart) {
      cart = new Cart({
        userId: req.userId,   // ✅ now always set
        products: [{ productId, quantity }]
      });
    } else {
      const index = cart.products.findIndex(p => p.productId.toString() === productId);
      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate("products.productId");
    res.status(201).json({ success: true, cart: populatedCart });

  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// PUT update cart
const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const idx = cart.products.findIndex(p => p.productId.toString() === productId);
    if (idx === -1) return res.status(404).json({ message: "Product not in cart" });

    if (quantity <= 0) cart.products.splice(idx, 1);
    else cart.products[idx].quantity = quantity;

    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// DELETE remove from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.productId.toString() !== productId);
    await cart.save();
    const populated = await cart.populate("products.productId");
    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
};
