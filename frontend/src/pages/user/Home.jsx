import React from "react";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import "../../css/Home.css";
import Category from "./Category";
import Footer from "./Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Header />

      <section className="why-choose-us">
        <h2>Our Category</h2>
        <Category />
      </section>
      <Footer />
    </>
  );
}

export default Home;
