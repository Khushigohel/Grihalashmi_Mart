import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "./Footer";
import axios from "axios";
import "../../css/productDetails.css";
import { useCart } from "../../context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
   const { addToCart } = useCart();

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

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      toast.success("Product added to cart!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product to cart.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

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
          <div className="offers">
            <h4>Available Offers</h4>
            <ul>
              <li>💰 Cashback up to ₹50 on UPI payments</li>
              <li>🚚 Free Delivery on orders above ₹499</li>
              <li>🔒 Secure transaction</li>
            </ul>
          </div>

          <div className="action-buttons">
            {/* <button className="add-to-cart"  onClick={() => addToCart(product._id, 1)}>Add to Cart</button> */}
            <button className="add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>

        </div>
      </div>
      <ToastContainer/>
      <Footer />
    </>
  );
}

export default ProductDetails;
