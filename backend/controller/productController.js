const Product = require("../models/Product");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: "Name, category, and price are required" });
    }

    const image = req.file ? `/uploads/images/${req.file.filename}` : null;
    const newProduct = new Product({ name, category, price, description, image });
    await newProduct.save();

    res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Product By ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};




// Edit Product
exports.editProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from URL
    const { name, category, price, description } = req.body;

    // Check required fields
    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: "Name, category, and price are required" });
    }

    // Handle image update
    const updatedFields = { name, category, price, description };
    if (req.file) {
      updatedFields.image = `/uploads/images/${req.file.filename}`;
    }

    // Find product and update
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedFields,
      { new: true } // return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

//count the total product
exports.countProduct=async(req,res)=>{
  try {
      const count = await Product.countDocuments();
      res.json({ success: true, count });
    } catch (error) {
      console.error("Count fetch error:", error);
      res.status(500).json({ success: false, message: "Failed to get count" });
    }
}
// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

