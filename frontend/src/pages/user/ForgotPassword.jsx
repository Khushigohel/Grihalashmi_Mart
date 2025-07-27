import React from "react";
import Navbar from "../../components/Navbar";
import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Step 1: Request OTP
  const requestOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      // const res = await fetch("http://localhost:5000/api/request-reset", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      const res = await fetch("http://localhost:5000/web/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.msg || "Something went wrong");
      } else {
        setMessage(data.msg);
        setOtpSent(true);
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
  };

  // Step 2: Reset Password using OTP
  const resetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/web/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      console.log("RESET RESPONSE:", data);

      if (!res.ok) {
        setError(data.msg || "Something went wrong");
      } else {
        setMessage(data.msg);
        setEmail("");
        setOtp("");
        setNewPassword("");
        setOtpSent(false);

        // Optional: Auto go back to login after success
        setTimeout(() => {
          openLogin(); // Show login form again
        }, 2000);
      }
    } catch {
      setError("Server error. Please try again.");
    }
    setLoading(false);
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
