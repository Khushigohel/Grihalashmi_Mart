import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders/all");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Count by status
  const totalOrders = orders.length;
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const packed = orders.filter((o) => o.status === "Packed").length;
  const shipped = orders.filter((o) => o.status === "Shipped").length;
  const outForDelivery = orders.filter((o) => o.status === "Out for Delivery").length;
  const cancelled = orders.filter((o) => o.status === "Cancelled").length;
  const pending = orders.filter((o) => o.status === "Pending").length;

  const orderStatusOptions = [
    "Pending",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];

  return (
    <div className="orders-container">
      <h2 className="page-title">Orders Overview</h2>
      <p className="subtitle">Manage and track all customer orders</p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card total">
          <h3>{totalOrders}</h3>
          <p>Total Orders</p>
        </div>
        <div className="card delivered">
          <h3>{delivered}</h3>
          <p>Delivered</p>
        </div>
        <div className="card shipped">
          <h3>{shipped}</h3>
          <p>Shipped</p>
        </div>
        <div className="card packed">
          <h3>{packed}</h3>
          <p>Packed</p>
        </div>
        <div className="card out">
          <h3>{outForDelivery}</h3>
          <p>Out for Delivery</p>
        </div>
        <div className="card cancelled">
          <h3>{cancelled}</h3>
          <p>Cancelled</p>
        </div>
        <div className="card pending">
          <h3>{pending}</h3>
          <p>Pending</p>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={order._id}>
                  <td>ORD{1001 + index}</td>
                  <td>{order.deliveryAddress?.fullName || "Unknown"}</td>
                  <td>{order.items?.[0]?.name || "No Item"}</td>
                  <td>₹{order.total}</td>

                  <td>
                    <span className={`status-badge ${order.status?.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>

                  <td>
                    {order.date
                      ? new Date(order.date).toISOString().split("T")[0]
                      : "N/A"}
                  </td>

                  <td>
                    <select
                      className="status-dropdown"
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      {orderStatusOptions.map((status) => (
                        <option value={status} key={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
