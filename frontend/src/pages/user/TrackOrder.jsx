import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../css/TrackOrder.css";
import Navbar from "../../components/Navbar";

const TrackOrder = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/orders/track/${orderId}`
                );
                setOrder(res.data);
            } catch (err) {
                setError("Order not found!");
            }
        };
        fetchOrder();
    }, [orderId]);

    const statusSteps = [
        { key: "pending", label: "Order Placed" },
        { key: "processing", label: "Being Prepared" },
        { key: "shipped", label: "Shipped" },
        { key: "out_for_delivery", label: "Out for Delivery" },
        { key: "delivered", label: "Delivered" }
    ];

    const currentIndex = statusSteps.findIndex(
        (s) => s.key === order?.status
    );

    return (
        <>
            <Navbar />
            <div className="track-page">
                <h2 className="track-heading">Track Your Order</h2>

                {error && <p className="error-msg">{error}</p>}

                {!order ? (
                    <p className="loading">Loading...</p>
                ) : (
                    <div className="track-container">

                        {/* ORDER HEADER */}
                        <div className="order-header">
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Status:</strong> {order.status}</p>
                            <p>
                                <strong>Deliver To:</strong>{" "}
                                {order.deliveryAddress?.fullName}, 
                                {order.deliveryAddress?.address}, {order.deliveryAddress?.City}, {order.deliveryAddress?.State} - {order.deliveryAddress?.Pincode}
                            </p>
                            <p><strong>Phone:</strong> {order.deliveryAddress?.phoneNumber}</p>
                        </div>

                        {/* TIMELINE */}
                        <div className="timeline-wrapper">
                            <div className="timeline-progress" style={{ width: `${(currentIndex / (statusSteps.length - 1)) * 100}%` }}></div>
                            {statusSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className={`timeline-step ${index <= currentIndex ? "active" : ""}`}
                                >
                                    <div className="step-circle">{index + 1}</div>
                                    <p className="step-label">{step.label}</p>
                                </div>
                            ))}
                        </div>

                        <hr />

                        {/* ITEMS */}
                        <h3 className="items-title">Items</h3>
                        <ul className="item-list">
                            {order.items.map((item, i) => (
                                <li key={i} className="item-card" onClick={() => window.location.href = `/product/${item._id || item.productId}`}>
                                    <img
                                        src={item.image || "/default-image.png"}
                                        alt={item.productName}
                                    />
                                    <div className="item-info">
                                        <span className="item-name">{item.productName}</span>
                                        <span className="item-qty">Qty: {item.quantity}</span>
                                        <span className="item-price">₹{item.price?.toFixed(2)}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* TOTAL */}
                        <p className="total">
                            <strong>Total Price:</strong> ₹{order.total?.toFixed(2)}
                        </p>

                    </div>
                )}
            </div>
        </>
    );
};

export default TrackOrder;
