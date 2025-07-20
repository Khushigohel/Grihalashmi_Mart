import React from "react";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import "../css/product.css";

function Product() {
  const products = [
    {
      id: 1,
      name: "Redmi 12 5G (Pastel Blue, 128 GB)",
      image:
        "https://macrameforbeginners.com/wp-content/uploads/2023/01/8-Stunning-PDF-Macrame-Wall-Hanging-Patterns-by-Cord-Quartz.jpg",
      price: 11999,
      originalPrice: 14999,
      rating: 4.3,
    },
    {
      id: 2,
      name: "Samsung Galaxy M13 (Stardust Brown, 64 GB)",
      image:
        "https://www.falgunigruhudhyog.in/cdn/shop/files/02KhichiyaPapdiCROP_1024x1024.jpg?v=1686030908",
      price: 10499,
      originalPrice: 13999,
      rating: 4.2,
    },
    {
      id: 3,
      name: "Realme Narzo 60X (Stellar Green, 128 GB)",
      image:
        "https://i.ytimg.com/vi/hofLl_8acIw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC_55VWIL4QHsi3c7BtX1FUATV5zg6/xif0q/mobile/y/l/z/-original-imagtqqddvcpkebz.jpeg",
      price: 11499,
      originalPrice: 14999,
      rating: 4.4,
    },
    // Add more as needed
  ];
  return (
    <>
      <Navbar />
      <div className="product-list-page">
        <h1 className="page-title text-center">Our Product</h1>
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-img"
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">
                  ₹{product.price}{" "}
                  <span className="original">₹{product.originalPrice}</span>
                </p>
                <p className="rating">⭐ {product.rating}</p>
                <button className="btn-view">View</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
