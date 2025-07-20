import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleError, handleSucess } from "./utils";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { ToastContainer } from "react-toastify";
const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setformData] = useState({
    fname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { fname, email, phoneNumber, password, confirmPassword } = formData;
    if (!fname || !email || !phoneNumber || !password || !confirmPassword) {
      return handleError("All Input Must Fill..");
    }
    if(password !== confirmPassword){
      return handleError("Password is Not match")
    }
    try {
      const response=await axios.post("http://localhost:5000/web/api/signUp",formData)

      const { success, message } = response.data;
      if (success) {
        handleSucess(message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        handleError(message || "Signup is failed");
      }
    } catch (error) {
      console.log("Sign in  error ");
      handleError("Something want to wrong..");
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
            Registration to Gruhalakshmi Mart
          </h4>

          <form onSubmit={handleSignUp}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Full Name
              </label>
              <input
                type="Name"
                name="fname"
                onChange={handleChange}
                autoFocus
                value={formData.fname}
                className="form-control"
                placeholder="Enter your Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={formData.email}
                className="form-control"
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Phone Number" className="form-label">
                Phone Number
              </label>
              <input
                type="Phone"
                name="phoneNumber"
                onChange={handleChange}
                value={formData.phoneNumber}
                className="form-control"
                placeholder="Enter your Phone Number"
              />
            </div>
            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                onChange={handleChange}
                value={formData.password}
                name="password"
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
            <div className="mb-3" style={{ position: "relative" }}>
              <label htmlFor="confirm-pass" className="form-label">
                Confrim Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                name="confirmPassword"
                onChange={handleChange}
                value={formData.confirmPassword}
                placeholder="Enter your confirm password"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  top: "70%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#333",
                }}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Button */}
            <button type="submit" className="btn btn-success w-100">
              Registration
            </button>

            {/* Link */}
            <p className="text-center mt-3">
              Already Have An Account ?<a href="/login">Login</a>
            </p>
          </form>
          <ToastContainer/>
        </div>
      </div>
    </>
  );
};

export default Registration;
