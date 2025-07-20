import React from 'react';
import { Link } from 'react-router-dom';

import { FaShoppingCart, FaSearch } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          Gruhalakshmi Mart
        </Link>

        {/* Mobile Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Search Bar */}
          <form className="d-flex mx-auto my-2 my-lg-0" style={{ maxWidth: '400px', width: '100%' }}>
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
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/product">Products</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/profile">Categories</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>

            </li>

            {/* Cart Icon */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={18} />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  0
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
