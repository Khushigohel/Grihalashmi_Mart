import React from 'react';
import './Login.css'; // Optional for custom styling

const Login = () => {
  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '500px', width: '200%' }}>
        <h4 className="text-center text-success fw-bold mb-3">Login to Grihalakshmi Mart</h4>

        <form>
          {/* User Type Dropdown */}
          <div className="mb-3">
            <label className="form-label">User Type</label>
            <select className="form-select">
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email" />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter your password" />
          </div>

          {/* Button */}
          <button type="submit" className="btn btn-success w-100">Login</button>

          {/* Link */}
          <p className="text-center mt-3">
            Don't have an account? <a href="/register">Register</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
