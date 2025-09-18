import React, { useState } from "react";
import axios from "axios";
import "../css/ProductDetailModalAdmin.css";

export default function ProductDetailModal({ product, onClose, onProductUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    price: product.price,
    description: product.description,
    stock: product.stock,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${product._id}`, formData);
      onProductUpdated(); // refresh products in ManageProducts
      setIsEditing(false);
      onClose();
    } catch (err) {
      console.error("Failed to update product:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>×</button>

        {/* Left: Product Image */}
        <div className="modal-image">
          <img src={`http://localhost:5000${product.image}`} alt={product.name} />
        </div>

        {/* Right: Product Info */}
        <div className="modal-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
              />
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
              />
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
              <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{product.name}</h2>
              <span className="category">{product.category}</span>
              <h3 className="price">₹{product.price}</h3>
              <p className="description">{product.description}</p>
              <div className={`stock ${product.stock > 0 ? "in" : "out"}`}>
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </div>
              <p className="product-id"><strong>ID:</strong> {product._id}</p>
              <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Product</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
