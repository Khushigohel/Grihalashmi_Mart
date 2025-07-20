import React, { useState } from "react";
import "../css/Login.css";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      <Navbar />
      <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
        <div
          className="card p-4 shadow-sm"
          style={{ maxWidth: "500px", width: "200%" }}
        >
          <h4 className="text-center text-success fw-bold mb-3">
            Login to Gruhalakshmi Mart
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

            {/* Password */}

            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "70%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>

            {/* Link */}
            <p className="text-center mt-3">
              Don't have an account? <a href="/register">Register</a>
            </p>
            <p className="text-center mt-3">
              ForgotPassword Password{" "}
              <a href="/forgot-password">Forgot Password</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
