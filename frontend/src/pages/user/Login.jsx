import React, { useState } from "react";
import "../../css/Login.css";
import Navbar from "../../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleError, handleSucess } from "./utils";
import axios from "axios";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginformData, setLoginformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginformData({ ...loginformData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginformData;
    if (!email || !password) {
      return handleError("Email and Password is Required..");
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/web/api/signIn",
        loginformData
      );
      if (response.data.success) {
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        console.log(localStorage.setItem("token",response.data.token));
        localStorage.setItem("userName", response.data.fname);
        localStorage.setItem("userId",response.data.userId);
        handleSucess("Login Sucessfully");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        handleError(response.data.message || "Signup failed");
      }
    } catch (error) {
      handleError("Something want to wrong");
    }
  };

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

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={loginformData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                value={loginformData.password}
                onChange={handleChange}
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
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Login;
