import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId"); // stored after login

  useEffect(() => {
    if (!userId) {
      setError("Please login to view your orders");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${userId}`
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

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <h2 className="text-center mb-4">📦 My Orders</h2>

        {/* Loading */}
        {loading && <p className="text-center">Loading your orders...</p>}

        {/* Error */}
        {error && !loading && (
          <p className="text-center text-danger">{error}</p>
        )}

        {/* No Orders */}
        {!loading && !error && orders.length === 0 && (
          <p className="text-center">You don’t have any orders yet.</p>
        )}

        {/* Orders List */}
        <div className="d-flex flex-column align-items-center">
          {orders.map((order) => (
            <div
              key={order._id}
              className="card shadow-sm mb-4 w-75 text-center"
              style={{ borderRadius: "12px" }}
            >
              {/* Order Header */}
              <div
                className="card-header text-white"
                style={{
                  backgroundColor: "#28a745",
                  fontWeight: "bold",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                }}
              >
                Order ID: {order._id}
              </div>

              <div className="card-body">
                {/* Date & Status */}
                <p className="text-muted mb-1">
                  Date:{" "}
                  {order.date
                    ? new Date(order.date).toLocaleString()
                    : "N/A"}
                </p>
                <p>
                  Status:{" "}
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "bg-warning"
                        : order.status === "shipped"
                        ? "bg-info"
                        : order.status === "delivered"
                        ? "bg-success"
                        : "bg-secondary"
                    }`}
                  >
                    {order.status || "N/A"}
                  </span>
                </p>

                {/* Product Details */}
                <h5 className="mt-3">🛒 Products</h5>
                <div className="d-flex flex-column align-items-center">
                  {order.items?.map((item, idx) => (
                    <Link
                      to={`/products/${item._id}`} // <-- navigate to product details
                      key={idx}
                      className="text-decoration-none text-dark w-75"
                    >
                      <div
                        className="d-flex align-items-center justify-content-between border p-2 mb-2"
                        style={{ borderRadius: "8px" }}
                      >
                        <img
                          src={item.image || "https://via.placeholder.com/60"}
                          alt={item.name}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "8px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="flex-grow-1 mx-3 text-start">
                          <p className="mb-1 fw-bold">{item.name}</p>
                          <p className="mb-0">
                            ₹{item.price} × {item.qty} ={" "}
                            <span className="text-success fw-bold">
                              ₹{(item.price * item.qty).toFixed(2)}
                            </span>
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Delivery Address */}
                {order.deliveryAddress && (
                  <div className="mt-3 text-start">
                    <h5>🚚 Delivery Address</h5>
                    <p className="mb-1">{order.deliveryAddress.fullName}</p>
                    <p className="mb-1">
                      {order.deliveryAddress.address},{" "}
                      {order.deliveryAddress.City},{" "}
                      {order.deliveryAddress.State} -{" "}
                      {order.deliveryAddress.Pincode}
                    </p>
                    <p className="mb-0">
                      📞 {order.deliveryAddress.phoneNumber}
                    </p>
                  </div>
                )}

                {/* Total */}
                <h4 className="mt-4 text-success">
                  Total: ₹{order.total?.toFixed(2)}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyOrders;
