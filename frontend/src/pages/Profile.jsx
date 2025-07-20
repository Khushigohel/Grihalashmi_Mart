import React, { useState } from 'react';
import '../css/Profile.css'
import Navbar from '../components/Navbar';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 profile-sidebar p-3 bg-white shadow-sm rounded">
            <h5 className="mb-4 fw-bold">My Account</h5>
            <ul className="list-group">
              <li className={`list-group-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>Profile Information</li>
              <li className={`list-group-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>My Orders</li>
              <li className={`list-group-item ${activeTab === 'address' ? 'active' : ''}`} onClick={() => setActiveTab('address')}>Saved Addresses</li>
              <li className={`list-group-item ${activeTab === 'logout' ? 'active' : ''}`} onClick={() => setActiveTab('logout')}>Logout</li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 bg-white p-4 shadow-sm rounded">
            {activeTab === 'profile' && (
              <div>
                <h4 className="mb-4">Profile Information</h4>
                <p><strong>Name:</strong> Khushi Gohel</p>
                <p><strong>Email:</strong> khushi@example.com</p>
                <p><strong>Phone:</strong> +91 9876543210</p>
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
                <h4 className="mb-4">My Orders</h4>
                <p>No recent orders found.</p>
              </div>
            )}
            {activeTab === 'address' && (
              <div>
                <h4 className="mb-4">Saved Addresses</h4>
                <p>No address saved yet.</p>
              </div>
            )}
            {activeTab === 'logout' && (
              <div>
                <h4>You have been logged out.</h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
