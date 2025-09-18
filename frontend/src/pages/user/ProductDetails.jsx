import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "./Footer";
import axios from "axios";
import "../../css/productDetails.css";

function ProductDetails() {
   const { id } = useParams();
  const [product, setProduct] = useState(null);

   useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <h3 className="text-center">Loading product details...</h3>;
  }

  return (
    <>
      <Navbar />
      <div className="details-container">
        {/* Left Side (Static Image Section) */}
        <div className="image-section">
          <img
            src={`http://localhost:5000${product.image}`}
            alt={product.name}
            className="main-img"
            onError={(e) => (e.target.src = "/default-product.png")}
          />
        </div>

        {/* Right Side (Scrollable Info Section) */}
        <div className="info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="category">Category: {product.category}</p>

          <h2 className="price">
            ₹{product.price}{" "}
            {product.originalPrice && (
              <span className="original">₹{product.originalPrice}</span>
            )}
          </h2>

          <p className="rating">⭐ {product.rating || "N/A"}</p>

          <p className="stock">
            {product.stock === 0 ? "Out of Stock" : "In Stock"}
          </p>

          <p className="description">{product.description}</p>

          <div className="btn-group">
            <button className="btn-add">Add to Cart</button>
            <button className="btn-buy">Buy Now</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProductDetails;
