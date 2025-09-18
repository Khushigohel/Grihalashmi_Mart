import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./style.css";

const AdminSidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/admin/loginadmin";
  };

  const isActive = (path) => (location.pathname === path ? "active-link" : "");

  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-logo">Admin Panel</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>
            🏠 Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/add-product" className={isActive("/admin/add-product")}>
            🛍️ Add Product
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-products" className={isActive("/admin/manage-products")}>
            🎯 Manage Products
          </Link>
        </li>
        <li>
          <Link to="/admin/orders" className={isActive("/admin/orders")}>
            📦 Orders
          </Link>
        </li>
        <li>
          <Link to="/admin/payments" className={isActive("/admin/payments")}>
            💳 Payments
          </Link>
        </li>
        <li>
          <button onClick={handleLogout} className="logout-btn">🚪 Log Out</button>
        </li>
        <li>
          <Link to="/" className={isActive("/")}>
            🔙 Back to Site
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
