import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router";

const Dashboard = () => {
 /* const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const resProducts = await fetch("http://localhost:5000/api/products/count");
        const resUsers = await fetch("http://localhost:5000/api/users/count");
        const resOrders = await fetch("http://localhost:5000/api/orders/count");

        const dataProducts = await resProducts.json();
        const dataUsers = await resUsers.json();
        const dataOrders = await resOrders.json();

        setStats({
          totalProducts: dataProducts.count || 0,
          totalUsers: dataUsers.count || 0,
          totalOrders: dataOrders.count || 0,
        });
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };

    fetchStats();
  }, []);*/

  //count total product
   const [ProductCount, setProductCount] = useState(0);
   const navigate=useNavigate();
   useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products/countProduct");
        const data = await res.json();
        if (data.success) {
          setProductCount(data.count);
        }
      } catch (err) {
        console.error("Failed to fetch Product count:", err);
      }
    };

    fetchProductCount();
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
          <p className="count">{ProductCount}</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Total Users</h3>
          {/*<p className="count">{stats.totalUsers}</p>*/}
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📦</div>
          <h3>Total Orders</h3>
        {/**   <p className="count">{stats.totalOrders}</p>*/}
        </div>
      </div>

      {/* Buttons Row */}
      <div className="dashboard-buttons">
        <button className="card-action-btn">View All Users</button>
        <button className="card-action-btn">View All Orders</button>
        <button className="card-action-btn"onClick={()=>navigate("/admin/manage-products")}>View All Products</button>
      </div>
    </div>
  );
};

export default Dashboard;
