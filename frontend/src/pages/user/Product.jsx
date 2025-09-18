import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "./Footer";
import "../../css/product.css";
import ProductCard from "../../components/ProductCard"; // ✅ import here
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="product-list-page">
        <h1 className="page-title text-center">✨ Our Products ✨</h1>
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-center">No products found</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
