import React, { useEffect, useState } from "react";
import "../../css/Profile.css";
import Navbar from "../../components/Navbar";
import axios from "axios";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token not found. Please login again.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/web/api/getProfile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message || "Failed to fetch user profile.");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        if (err.response?.status === 401) {
          setError("Session expired. Please login again.");
        } else {
          setError(err.response?.data?.message || "Something went wrong.");
        }
        localStorage.removeItem("token"); // remove invalid token
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login page
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid profile-page">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 bg-white border-right vh-100 p-3">
            <div className="mb-4 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User"
                className="rounded-circle"
                width="80"
              />
              <h5 className="mt-2">Hello</h5>
            </div>
            <ul className="list-group">
              <li
                className={`list-group-item ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => setActiveTab("profile")}
              >
                Profile Information
              </li>
              <li
                className={`list-group-item ${
                  activeTab === "orders" ? "active" : ""
                }`}
                onClick={() => setActiveTab("orders")}
              >
                My Orders
              </li>
              <li
                className={`list-group-item ${
                  activeTab === "address" ? "active" : ""
                }`}
                onClick={() => setActiveTab("address")}
              >
                Saved Addresses
              </li>
              <li
                className="list-group-item text-danger"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 bg-white p-4 shadow-sm rounded">
            {activeTab === "profile" && (
              <div>
                <h4 className="mb-4">Profile Information</h4>
                {error && <p className="text-danger">{error}</p>}
                {user ? (
                  <ul className="list-group">
                    <li className="list-group-item">
                      <strong>Name:</strong> {user.fname} {user.lname}
                    </li>
                    <li className="list-group-item">
                      <strong>Email:</strong> {user.email}
                    </li>
                    <li className="list-group-item">
                      <strong>Phone Number:</strong> {user.phoneNumber}
                    </li>
                  </ul>
                ) : !error ? (
                  <p>Loading profile...</p>
                ) : null}
                <div className="bg-white mt-4 p-4 rounded shadow-sm">
                  <h5>FAQs</h5>
                  <p>
                    <strong>
                      What happens when I update my email address or mobile
                      number?
                    </strong>
                  </p>
                  <p>
                    Your login email ID or mobile number changes. You’ll receive
                    account-related communication on your updated details.
                  </p>
                  <p>
                    <strong>
                      When will my account be updated with the new details?
                    </strong>
                  </p>
                  <p>
                    It happens as soon as you confirm the verification code sent
                    to your email or mobile.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h4 className="mb-4">My Orders</h4>
                <p>No recent orders found.</p>
              </div>
            )}

            {activeTab === "address" && (
              <div
                className="d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "400px" }}
              >
                <img
                  src="https://img.freepik.com/premium-vector/delivery-service-courier-employee-worker-feeling-clueless-puzzled-confused-have-no-idea-address_199628-462.jpg"
                  alt="No Address"
                  style={{ width: "350px", marginBottom: "0px" }}
                />
                <h5>No Addresses found in your account!</h5>
                <p className="text-muted mb-3">Add a delivery address.</p>
                <button className="btn btn-primary">ADD ADDRESSES</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
