import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
    const { cartCount,clearCart } = useCart();


  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    const storedName = localStorage.getItem("userName");
    setisLoggedIn(loginStatus == "true");
    if (storedName) setUserName(storedName);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    setisLoggedIn(false);
    setUserName("");
    clearCart();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" style={{ color:"#4052b7" }}  to="/">
          Gruhalakshmi Mart
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form
            className="d-flex mx-auto my-2 my-lg-0"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for products"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              <FaSearch />
            </button>
          </form>

          {/* Nav Links */}
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center gap-3">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">
                Products
              </Link>
            </li>

            {/*<li className="nav-item">
              <Link className="nav-link" to="">
                Categories
              </Link>
            </li>*/}
             <li className="nav-item">
              <Link className="nav-link" to="/my-order">
                MyOrder
              </Link>
            </li>
            {!isLoggedIn ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={handleLogout}>
                  Login
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUser className="me-1" />
                    {userName || "User"}
                  </span>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item" to="/profile">
                        👤 Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-danger"
                        to="/login"
                        onClick={handleLogout}
                      >
                        🚪 Logout
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}
            {/* Cart Icon */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={18} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
