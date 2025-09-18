const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { addProduct, getProducts, deleteProduct, editProduct, countProduct, getProductById } = require("../../controller/productController");

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.post("/add-product", upload.single("image"), addProduct);
router.get("/", getProducts);
router.put("/edit-product/:id", upload.single("image"), editProduct);
router.get("/countProduct",countProduct);
router.get("/:id", getProductById);
router.delete("/:id", deleteProduct);


module.exports = router;
