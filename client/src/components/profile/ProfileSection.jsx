import React from "react";
import PropTypes from "prop-types";

const ProfileSection = ({ user }) => {
  if (!user) return null;

  const getDisplayAddress = () => {
    if (!user.addresses || user.addresses.length === 0) return "Not updated yet";
    
    const defaultAddr = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
    return [defaultAddr.street, defaultAddr.ward, defaultAddr.district, defaultAddr.province]
      .filter(Boolean)
      .join(", ");
  };

  const joinDate = user.createdAt 
    ? new Date(user.createdAt).toLocaleDateString('en-GB')
    : "N/A";

  const membershipLevel = user.status === 'active' ? "Gold Member ✨" : "Standard Member";

  return (
    <div id="profile-section">
      <div className="status-bar">
        <textarea placeholder={`What's on your mind, ${user.customer_name}?`}></textarea>
        <button>Post</button>
      </div>

      <div className="bio-card">
        <div className="bio-header">“Welcome to Blummi Cosmetics”</div>

        <h3>Personal Information</h3>
        <table className="bio-table">
          <tbody>
            <tr>
              <td>Full name:</td>
              <td className="fw-bold">{user.customer_name}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{user.email}</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>{user.phone_number || "Not provided"}</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>{getDisplayAddress()}</td>
            </tr>
            <tr>
              <td>Date of participation:</td>
              <td>{joinDate}</td>
            </tr>
            <tr>
              <td>Membership level:</td>
              <td className="text-warning fw-bold">{membershipLevel}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* LƯU Ý: Phần Stats dưới đây hiện tại là dữ liệu tĩnh (Hardcoded) 
        vì Database Customer chưa có liên kết trực tiếp đến bảng Orders để đếm số lượng.
        Bạn cần gọi API lấy count đơn hàng để fill vào đây sau này.
      */}
      <section className="stats-grid">
        <div className="stat-card ordered">
          <h2>35</h2>
          <p>Order placed</p>
        </div>
        <div className="stat-card processing">
          <h2>8</h2>
          <p>Processing</p>
        </div>
        <div className="stat-card delivered">
          <h2>63</h2>
          <p>Delivered</p>
        </div>
        <div className="stat-card canceled">
          <h2>5</h2>
          <p>Canceled</p>
        </div>
      </section>
    </div>
  );
};

ProfileSection.propTypes = {
  user: PropTypes.shape({
    customer_name: PropTypes.string,
    email: PropTypes.string,
    phone_number: PropTypes.string,
    addresses: PropTypes.array,
    createdAt: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};

export default ProfileSection;