import React, { useState } from "react";
import PropTypes from "prop-types";

const ManagementSection = ({ user, onUserUpdated }) => {
  const [activeTab, setActiveTab] = useState("info"); // info, password, address
  const token = localStorage.getItem("auth_token");

  // State cho Update Info
  const [infoForm, setInfoForm] = useState({
    customer_name: user.customer_name || "",
    phone_number: user.phone_number || "",
  });

  // State cho Change Password
  const [passForm, setPassForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Handlers
  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/customer/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(infoForm),
      });
      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        onUserUpdated(data.data); // Update parent state
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  const handlePassSubmit = async (e) => {
    e.preventDefault();
    if (passForm.newPassword !== passForm.confirmPassword) {
      return alert("New passwords do not match.");
    }
    try {
      const res = await fetch("/api/customer/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(passForm),
      });
      const data = await res.json();
      alert(data.message);
      if (data.success) setPassForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to change password.");
    }
  };

  return (
    <div>
      <h2 className="fw-bold mb-4 pb-2 border-bottom" style={{ color: "#81c408" }}>Manage Profile</h2>

      {/* Tabs Navigation */}
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "info" ? "active bg-secondary" : "text-dark"}`}
            onClick={() => setActiveTab("info")}
          >
            Personal Info
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "password" ? "active bg-secondary" : "text-dark"}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "address" ? "active bg-secondary" : "text-dark"}`}
            onClick={() => setActiveTab("address")}
          >
            Address Book
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content">

        {/* 1. Personal Info Form */}
        {activeTab === "info" && (
          <form onSubmit={handleInfoSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={infoForm.customer_name}
                onChange={(e) => setInfoForm({ ...infoForm, customer_name: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={infoForm.phone_number}
                onChange={(e) => setInfoForm({ ...infoForm, phone_number: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input type="email" className="form-control bg-light" value={user.email} readOnly disabled />
              <small className="text-muted">Email cannot be changed.</small>
            </div>
            <button type="submit" className="btn text-white" style={{ backgroundColor: "#81c408" }}>
              Update Info
            </button>
          </form>
        )}

        {/* 2. Change Password Form */}
        {activeTab === "password" && (
          <form onSubmit={handlePassSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Current Password</label>
              <input
                type="password"
                className="form-control"
                value={passForm.currentPassword}
                onChange={(e) => setPassForm({ ...passForm, currentPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">New Password</label>
              <input
                type="password"
                className="form-control"
                value={passForm.newPassword}
                onChange={(e) => setPassForm({ ...passForm, newPassword: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-bold">Confirm New Password</label>
              <input
                type="password"
                className="form-control"
                value={passForm.confirmPassword}
                onChange={(e) => setPassForm({ ...passForm, confirmPassword: e.target.value })}
                required
              />
            </div>
            <button type="submit" className="btn text-white" style={{ backgroundColor: "#81c408" }}>
              Save Password
            </button>
          </form>
        )}

        {/* 3. Address Management (Simplified View) */}
        {activeTab === "address" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Saved Addresses</h5>
              <button className="btn btn-outline-secondary btn-sm">+ Add New</button>
            </div>
            <div className="list-group">
              {user.addresses && user.addresses.length > 0 ? user.addresses.map((addr, idx) => (
                <div key={idx} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-bold">{addr.street}</div>
                    <div className="small text-muted">{addr.ward}, {addr.district}, {addr.province}</div>
                    {addr.isDefault && <span className="badge bg-success mt-1">Default</span>}
                  </div>
                  <button className="btn btn-sm text-danger"><i className="fas fa-trash"></i></button>
                </div>
              )) : (
                <p className="text-muted text-center py-3">No addresses saved.</p>
              )}
            </div>
            <small className="text-muted d-block mt-3">* Address management modal logic can be integrated here similarly to AuthPage.</small>
          </div>
        )}

      </div>
    </div>
  );
};

ManagementSection.propTypes = {
  user: PropTypes.object.isRequired,
  onUserUpdated: PropTypes.func.isRequired,
};

export default ManagementSection;