import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import "../../css/Home.css";
import Category from "./Category";
import Footer from "./Footer";
import axios from "axios";
import ProductCard from "../../components/ProductCard";
function Home() {
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
      <Header />

      <section className="why-choose-us">
        <h2>Our Category</h2>
        <Category />
      </section>
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

export default Home;
