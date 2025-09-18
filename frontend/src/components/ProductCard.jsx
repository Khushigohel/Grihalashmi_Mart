import React, { useState } from "react";
import "../css/ProductCard.css";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {
  const navigate=useNavigate();



  return (
    <div className="product-card">
      <div className="img-container">
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="product-img"
          onError={(e) => (e.target.src = "/default-product.png")}
        />
      </div>
      <h3 className="product-title">{product.name}</h3>
      <p className="product-category">Category: {product.category}</p>

      <p className="product-desc">{product.description}</p>

      <p className="product-price">₹{product.price}</p>
      <p className="product-stock">In Stock</p>
        <button
        className="view-btn"
        onClick={() => navigate(`/products/${product._id}`)}
      >
        View Details
      </button>

    </div>
  );
};

export default ProductCard;
