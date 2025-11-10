import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products
        const productRes = await fetch("http://localhost:5000/api/products/countProduct");
        const productData = await productRes.json();
        if (productData.success) setProductCount(productData.count);

        // Fetch users
       const userRes = await fetch("http://localhost:5000/web/api/countUser");
        const userData = await userRes.json();
        if (userData.success) setUserCount(userData.count);

        // Fetch orders and payments
       const orderRes = await fetch("http://localhost:5000/api/orders/countOrder");
        const orderData = await orderRes.json();
        if (orderData.success) {
          setOrderCount(orderData.totalOrders);
          setTotalPayment(orderData.totalPayments);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <p>Monitor and manage your Grihalakshmi-Mart efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-icon">🛒</div>
          <h3>Total Products</h3>
          <p className="count">{productCount}</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Total Users</h3>
          <p className="count">{userCount}</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <h3>Total Orders</h3>
          <p className="count">{orderCount}</p>
        </div>
      </div>

      {/* Buttons Row */}
      <div className="dashboard-buttons">
        <button className="card-action-btn">View All Users</button>
        <button className="card-action-btn" onClick={()=>navigate("/admin/Orders")}>View All Orders</button>
        <button className="card-action-btn" onClick={() => navigate("/admin/manage-products")}>
          View All Products
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
