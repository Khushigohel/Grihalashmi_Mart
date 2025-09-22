import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="container text-center my-5">
        <h2 className="text-success">🎉 Order Placed Successfully!</h2>
        <p>Your order has been confirmed. We'll notify you once it's shipped.</p>
        <button
          className="btn btn-primary mt-3"
          style={{ background: "#4052b7" }}
          onClick={() => navigate("/my-order")}
        >
           View My Orders
        </button>
        
      </div>
    </>
  );
};

export default OrderSuccess;