// src/components/UserLayout.jsx
import React from "react";
import Navbar from "./Navbar"; // Make sure the path is correct
// import Footer from "./Footer"; // Optional

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mt-4">{children}</div>
      {/* <Footer /> */}
    </>
  );
};

export default UserLayout;
