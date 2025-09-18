import React from "react";
import "../../css/Orders.css";

export default function Orders() {
  // Demo orders data
  const orders = [
    { id: "ORD1001", customer: "Dhrupa Patel", product: "Handmade Bag", amount: 120, status: "Delivered", date: "2025-09-08" },
    { id: "ORD1002", customer: "Khushi Gohel", product: "Embroidery Kurti", amount: 250, status: "Processing", date: "2025-09-09" },
    { id: "ORD1003", customer: "Vrunda Chavda", product: "Festive Gift Hamper", amount: 400, status: "Cancelled", date: "2025-09-07" },
    { id: "ORD1004", customer: "Vidisha Dave", product: "Stitched Blouse", amount: 180, status: "Delivered", date: "2025-09-06" },
  ];

  return (
    <div className="orders-container">
      {/* Header */}
      <h2>Orders Overview</h2>
      <p className="subtitle">Manage and track customer orders in real-time</p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card total">
          <h3>4</h3>
          <p>Total Orders</p>
        </div>
        <div className="card delivered">
          <h3>2</h3>
          <p>Delivered</p>
        </div>
        <div className="card processing">
          <h3>1</h3>
          <p>Processing</p>
        </div>
        <div className="card cancelled">
          <h3>1</h3>
          <p>Cancelled</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="orders-table-wrapper">
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
            {orders.map((o, idx) => (
              <tr key={o.id} className={`fade-in-row delay-${idx}`}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>₹{o.amount}</td>
                <td>
                  <span
                    className={`status-badge ${
                      o.status === "Delivered"
                        ? "status-delivered"
                        : o.status === "Processing"
                        ? "status-processing"
                        : "status-cancelled"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.date}</td>
                <td>
                  <button className="view-btn">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
