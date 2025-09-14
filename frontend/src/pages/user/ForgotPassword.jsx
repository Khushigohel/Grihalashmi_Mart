import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailjs from "@emailjs/browser";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const EMAILJS_SERVICE_ID = "service_eyc3wmd";
  const EMAILJS_TEMPLATE_ID = "template_fe5id9p";
  const EMAILJS_PUBLIC_KEY = "FapwK4xIgpqbQc_iN";

  const requestOtp = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/web/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        setLoading(false);
        return;
      }

      // Send OTP using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { email, passcode: data.otp },
        EMAILJS_PUBLIC_KEY
      );

      setMessage("OTP sent to your email");
      setOtpSent(true);

    } catch (err) {
      console.error("Error sending OTP:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/web/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.message || "Something went wrong");
      else {
        setMessage(data.message);
        setEmail(""); setOtp(""); setNewPassword(""); setOtpSent(false);
      }

    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="card p-4 shadow-sm" style={{ maxWidth: "500px", width: "100%" }}>
          <h4 className="text-center text-success fw-bold mb-3">Forgot Password</h4>

          {!otpSent ? (
            <form onSubmit={requestOtp}>
              <div className="mb-3">
                <label>Email address</label>
                <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
              </div>
              <button className="btn btn-success w-100" type="submit" disabled={loading}>{loading ? "Sending..." : "Send OTP"}</button>
            </form>
          ) : (
            <form onSubmit={resetPassword}>
              <div className="mb-3">
                <label>Enter OTP</label>
                <input type="text" className="form-control" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" required />
              </div>
              <div className="mb-3 position-relative">
                <label>New Password</label>
                <input type={showPassword ? "text" : "password"} className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Enter new password" required />
                <span onClick={() => setShowPassword(!showPassword)} style={{ position:"absolute", top:"50%", right:"10px", transform:"translateY(-50%)", cursor:"pointer"}}>
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
                </span>
              </div>
              <button className="btn btn-success w-100" type="submit" disabled={loading}>{loading ? "Resetting..." : "Reset Password"}</button>
            </form>
          )}

          {error && <p className="text-danger mt-3">{error}</p>}
          {message && <p className="text-success mt-3">{message}</p>}
          <p className="text-center mt-3"><a href="/login">Back To Login</a></p>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
