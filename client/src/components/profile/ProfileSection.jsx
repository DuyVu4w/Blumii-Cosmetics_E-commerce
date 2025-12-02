import React from "react";

const ProfileSection = () => {
  return (
    <div id="profile-section">
      <div className="status-bar">
        <textarea placeholder="What do you think about BLUMMI?"></textarea>
        <button>Post</button>
      </div>

      <div className="bio-card">
        <div className="bio-header">“Welcome to Blummi Cosmetics”</div>

        <h3>Personal Information</h3>
        <table className="bio-table">
          <tbody>
            <tr>
              <td>Full name:</td>
              <td>Nguyễn Thị Anh Thư</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>nguyenanhthu09205@gmail.com</td>
            </tr>
            <tr>
              <td>Phone Number:</td>
              <td>0909099999</td>
            </tr>
            <tr>
              <td>Address:</td>
              <td>Tân Phong, Quận 7, TP.Hồ Chí Minh</td>
            </tr>
            <tr>
              <td>Date of participation:</td>
              <td>10/10/2024</td>
            </tr>
            <tr>
              <td>Membership level:</td>
              <td>Vàng ✨</td>
            </tr>
          </tbody>
        </table>
      </div>

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

export default ProfileSection;
