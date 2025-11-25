import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "../../css/MyOrders.css";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  const statusColor = (status) => {
    const key = (status || "").toLowerCase();
    if (key.includes("pending") || key.includes("placed")) return "#f1c40f";
    if (key.includes("packed") || key.includes("processing")) return "#3498db";
    if (key.includes("shipped")) return "#1abc9c";
    if (key.includes("delivered")) return "#2ecc71";
    if (key.includes("cancel")) return "#e74c3c";
    return "#95a5a6";
  };

  return (
    <>
      <Navbar />
      <div className="orders-page">
        <div className="orders-wrapper">
          <h1>My Orders</h1>

          {loading && <p className="muted">Loading your orders...</p>}
          {error && !loading && <p className="error">{error}</p>}
          {!loading && !error && orders.length === 0 && (
            <p className="muted">You don't have any orders yet.</p>
          )}

          <div className="orders-grid">
            {!loading &&
              orders.map((order) => (
                <div className="order-card" key={order._id}>
                  {/* Order Header */}
                  <div className="order-header">
                    <div>
                      <strong>Order:</strong> {order._id}
                    </div>
                    <div>
                      <strong>Date:</strong>{" "}
                      {order.date ? new Date(order.date).toLocaleString() : "-"}
                    </div>
                    <div
                      className="status-pill"
                      style={{ backgroundColor: statusColor(order.status) }}
                    >
                      {order.status || "N/A"}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="order-items">
                    {order.items?.map((item, idx) => (
                      <div className="item" key={idx}>
                        <img
                          src={
                            item.image ||
                            "/mnt/data/11e833de-ff52-4d21-8666-4cca1d311fc5.png"
                          }
                          alt={item.name}
                          className="item-image"
                        />
                        <div className="item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-qty">
                            Qty: {item.qty} | ₹{(item.price * item.qty).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address & Total */}
                  <div className="order-footer">
                    <div className="delivery-address">
                      {order.deliveryAddress ? (
                        <>
                          <strong>{order.deliveryAddress.fullName}</strong> <br />
                          {order.deliveryAddress.address}, {order.deliveryAddress.City},{" "}
                          {order.deliveryAddress.State} - {order.deliveryAddress.Pincode} <br />
                          <strong>Phone:</strong> {order.deliveryAddress.phoneNumber}
                        </>
                      ) : (
                        <span>No delivery address</span>
                      )}
                    </div>

                    <div className="order-total">
                      <strong>Total:</strong> ₹{order.total?.toFixed(2)}
                    </div>
                  </div>

                  <Link to={`/track-order/${order._id}`}>
                    <button className="track-button">Track Order</button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrder;
