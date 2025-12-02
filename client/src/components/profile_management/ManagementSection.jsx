import React from "react";

const ManagementSection = () => {
  return (
    <div id="manage-section">
      <section className="section">
        <h2>Update Personal Information</h2>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" defaultValue="Lê Anh Thư" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="thu.anh@blumii.com" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" defaultValue="0902 123 456" />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select defaultValue="Nữ">
              <option>-- Select --</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input type="date" defaultValue="2001-04-20" />
          </div>
          <button type="submit" className="btn">
            💾 Save changes
          </button>
        </form>
      </section>

      <section className="section">
        <h2>Delivery Address</h2>
        <div className="address-list">
          <div className="address-card">
            <div className="address-actions">
              <button>✏️ Edit</button>
              <button>🗑️ Delete</button>
            </div>
            <h4>Home</h4>
            <p>Tân Phong, Quận 7, Tp.HCM</p>
            <p>SĐT: 0909999999</p>
          </div>

          <div className="address-card">
            <div className="address-actions">
              <button>✏️ Edit</button>
              <button>🗑️ Delete</button>
            </div>
            <h4>Office</h4>
            <p>ĐH Tôn Đức Thắng</p>
            <p>SĐT: 0120120122</p>
          </div>
        </div>
        <button className="btn" style={{ marginTop: "20px" }}>
          ➕ Add new address
        </button>
      </section>

      <section className="section">
        <h2>Reset Password</h2>
        <form>
          <div className="form-group">
            <label>Current password</label>
            <input type="password" placeholder="Enter current password" />
          </div>
          <div className="form-group">
            <label>New password</label>
            <input type="password" placeholder="Enter new password" />
          </div>
          <div className="form-group">
            <label>Confirm new password</label>
            <input type="password" placeholder="Re-enter new password" />
          </div>
          <button type="submit" className="btn">
            💾 Lưu mật khẩu mới
          </button>
        </form>
      </section>
    </div>
  );
};

export default ManagementSection;
