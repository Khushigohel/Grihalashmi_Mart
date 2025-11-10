import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders from backend
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

  // Function to update status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      // update frontend instantly
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
  const delivered = orders.filter((o) => o.status === "delivered").length;
  const processing = orders.filter((o) => o.status === "processing").length;
  const cancelled = orders.filter((o) => o.status === "cancelled").length;

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
        <div className="card processing">
          <h3>{processing}</h3>
          <p>Processing</p>
        </div>
        <div className="card cancelled">
          <h3>{cancelled}</h3>
          <p>Cancelled</p>
        </div>
      </div>

      {/* Orders Table */}
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
                    <span
                      className={`status-badge ${order.status?.toLowerCase()}`}
                    >
                      {order.status
                        ? order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)
                        : "Pending"}
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
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
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
