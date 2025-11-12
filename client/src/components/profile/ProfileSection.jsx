import React from "react";

const ProfileSection = () => {
  return (
    <div id="profile-section">
      <div className="status-bar">
        <textarea placeholder="Bạn đang nghĩ gì về BLUMII?"></textarea>
        <button>Đăng</button>
      </div>

      <div className="bio-card">
        <div className="bio-header">
          “Chào mừng bạn đã đến với Blummii Cosmetics”
        </div>

        <h3>Thông tin cá nhân</h3>
        <table className="bio-table">
          <tbody>
            <tr>
              <td>Họ và tên:</td>
              <td>Nguyễn Thị Anh Thư</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>nguyenanhthu09205@gmail.com</td>
            </tr>
            <tr>
              <td>Điện thoại:</td>
              <td>0909099999</td>
            </tr>
            <tr>
              <td>Địa chỉ:</td>
              <td>Tân Phong, Quận 7, TP.Hồ Chí Minh</td>
            </tr>
            <tr>
              <td>Ngày tham gia:</td>
              <td>10/10/2024</td>
            </tr>
            <tr>
              <td>Hạng thành viên:</td>
              <td>
                Vàng{" "}
                <i
                  className="fa-solid fa-crown"
                  style={{ color: "#ffd700", marginLeft: "5px" }}
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <section className="stats-grid">
        <div className="stat-card ordered">
          <h2>35</h2>
          <p>Đơn hàng đã đặt</p>
        </div>
        <div className="stat-card processing">
          <h2>8</h2>
          <p>Đang xử lý</p>
        </div>
        <div className="stat-card delivered">
          <h2>63</h2>
          <p>Đã giao thành công</p>
        </div>
        <div className="stat-card canceled">
          <h2>5</h2>
          <p>Đơn hàng đã hủy</p>
        </div>
      </section>
    </div>
  );
};

export default ProfileSection;
