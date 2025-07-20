import React from "react";
import Navbar from "../components/Navbar";

function ForgotPassword() {
  return (
    <>
      <Navbar />
      <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "500px", width: "200%" }}
        >
          <h4 className="text-center text-success fw-bold mb-3">
            Forgot Password{" "}
          </h4>

          <form>
            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>

            {/* Link */}
            <p className="text-center mt-3">
              <a href="/login">Back To Login</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
