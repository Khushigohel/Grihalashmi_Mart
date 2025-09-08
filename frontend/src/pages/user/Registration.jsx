import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { handleError, handleSucess } from "./utils";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import emailjs from "@emailjs/browser";

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
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);

    // const templateParams = {
    //   to_name: formData.fname,
    //   to_email: formData.email,
    //   passcode: otp,
    // };
    //console.log("Sending OTP with these params:", templateParams);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          to_name: formData.fname,
          email: formData.email,
          passcode: otp,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then((response) => {
        setOtpSent(true);
        handleSucess("OTP sent to your email");
        console.log(" OTP email sent!", response.status, response.text);
      })
      .catch(() => {
        handleError("Failed to send OTP");
        console.error(" OTP email error:", err);
      });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { fname, email, phoneNumber, password, confirmPassword } = formData;
    if (!fname || !email || !phoneNumber || !password || !confirmPassword) {
      return handleError("All Input Must Fill..");
    }
    if (password !== confirmPassword) {
      return handleError("Password is Not match");
    }

    sendOtp();
  };
  const handleOtpVerify = async () => {
    if (userOtp === generatedOtp) {
      try {
        const response = await axios.post(
          "http://localhost:5000/web/api/signUp",
          formData
        );
        if (response.data.success) {
          handleSucess("Registration successful");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          handleError(response.data.message || "Signup failed");
        }
      } catch (err) {
        handleError("Something went wrong.");
      }
    } else {
      handleError("Incorrect OTP");
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
          {!otpSent ? (
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
                Send OTP
              </button>

              {/* Link */}
              <p className="text-center mt-3">
                Already Have An Account ?<a href="/login">Login</a>
              </p>
            </form>
          ) : (
            <>
              <h5 className="text-center text-primary mb-3">Enter OTP</h5>
              <p className="text-muted text-center">
                OTP has been sent to <strong>{formData.email}</strong>
              </p>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter OTP"
                value={userOtp}
                onChange={(e) => setUserOtp(e.target.value)}
              />
              <button
                className="btn btn-primary w-100"
                onClick={handleOtpVerify}
              >
                Verify & Register
              </button>
            </>
          )}
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default Registration;
