import React from "react";
import "../../css/Payment.css";

export default function Payments() {
  // Demo payment data
  const payments = [
    { id: "PAY001", customer: "Dhrupa Patel", order: "ORD1001", amount: 120, method: "UPI", status: "Completed", date: "2025-09-10" },
    { id: "PAY002", customer: "Vrunda Chavda", order: "ORD1002", amount: 250, method: "COD", status: "Pending", date: "2025-09-09" },
    { id: "PAY003", customer: "Khushi Gohel", order: "ORD1003", amount: 90, method: "Card", status: "Failed", date: "2025-09-08" },
    { id: "PAY004", customer: "Vidisha Dave", order: "ORD1004", amount: 300, method: "NetBanking", status: "Completed", date: "2025-09-07" },
  ];

  return (
    <div className="payments-container">
      {/* Header */}
      <h2>Payments Overview</h2>
      <p className="subtitle">Track and manage all payment transactions efficiently</p>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card completed">
          <h3>₹760</h3>
          <p>Total Revenue</p>
        </div>
        <div className="card completed">
          <h3>2</h3>
          <p>Completed</p>
        </div>
        <div className="card pending">
          <h3>1</h3>
          <p>Pending</p>
        </div>
        <div className="card failed">
          <h3>1</h3>
          <p>Failed</p>
        </div>
      </div>

      {/* Payments Table */}
      <div className="payments-table-wrapper">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Customer</th>
              <th>Order</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, idx) => (
              <tr key={p.id} className={`fade-in-row delay-${idx}`}>
                <td>{p.id}</td>
                <td>{p.customer}</td>
                <td>{p.order}</td>
                <td>₹{p.amount}</td>
                <td>{p.method}</td>
                <td>
                  <span
                    className={`status-badge ${
                      p.status === "Completed"
                        ? "status-completed"
                        : p.status === "Pending"
                        ? "status-pending"
                        : "status-failed"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
                <td>{p.date}</td>
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
