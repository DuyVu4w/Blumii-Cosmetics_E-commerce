import React from "react";

const ManagementSection = () => {
  return (
    <div id="manage-section">
      <section className="section">
        <h2>Cập nhật thông tin cá nhân</h2>
        <form>
          <div className="form-group">
            <label>Họ và tên</label>
            <input type="text" defaultValue="Lê Anh Thư" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" defaultValue="thu.anh@blumii.com" />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input type="text" defaultValue="0902 123 456" />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select defaultValue="Nữ">
              <option>-- Chọn --</option>
              <option>Nam</option>
              <option>Nữ</option>
            </select>
          </div>
          <div className="form-group">
            <label>Ngày sinh</label>
            <input type="date" defaultValue="2001-04-20" />
          </div>
          <button type="submit" className="btn">
            💾 Lưu thay đổi
          </button>
        </form>
      </section>

      <section className="section">
        <h2>Địa chỉ giao hàng</h2>
        <div className="address-list">
          <div className="address-card">
            <div className="address-actions">
              <button>✏️ Sửa</button>
              <button>🗑️ Xóa</button>
            </div>
            <h4>Nhà riêng</h4>
            <p>Tân Phong, Quận 7, Tp.HCM</p>
            <p>SĐT: 0909999999</p>
          </div>

          <div className="address-card">
            <div className="address-actions">
              <button>✏️ Sửa</button>
              <button>🗑️ Xóa</button>
            </div>
            <h4>Văn phòng</h4>
            <p>ĐH Tôn Đức Thắng</p>
            <p>SĐT: 0120120122</p>
          </div>
        </div>
        <button className="btn" style={{ marginTop: "20px" }}>
          ➕ Thêm địa chỉ mới
        </button>
      </section>

      <section className="section">
        <h2>Đổi mật khẩu</h2>
        <form>
          <div className="form-group">
            <label>Mật khẩu hiện tại</label>
            <input type="password" placeholder="Nhập mật khẩu hiện tại" />
          </div>
          <div className="form-group">
            <label>Mật khẩu mới</label>
            <input type="password" placeholder="Nhập mật khẩu mới" />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input type="password" placeholder="Nhập lại mật khẩu mới" />
          </div>
          <button type="submit" className="btn">
            <i className="fa-solid fa-lock"></i> Lưu mật khẩu mới
          </button>
        </form>
      </section>
    </div>
  );
};

export default ManagementSection;
