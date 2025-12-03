import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const Sidebar = ({ activeSection, setActiveSection, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!confirm) return;

    localStorage.removeItem("auth_token");

    navigate("/", { replace: true });
  };
  return (
    <aside className="sidebar">
      <img
        src={user?.avatar || "https://cdn-icons-png.flaticon.com/512/2922/2922561.png"}
        alt="avatar"
      />
      <h3>{user?.customer_name || "Customer"}</h3>
      <p>{user?.email || "email@example.com"}</p>

      <ul>
        {/* sidebar Hồ sơ */}
        <li
          className={activeSection === "profile" ? "active" : ""}
          onClick={() => setActiveSection("profile")}
        >
          👤 My profile
        </li>

        {/* sidebar qly hso */}
        <li
          className={activeSection === "manage" ? "active" : ""}
          onClick={() => setActiveSection("manage")}
        >
          📝 Manage Profile
        </li>

        {/* sidebar đơn hàng */}
        <li
          className={activeSection === "myorder" ? "active" : ""}
          onClick={() => setActiveSection("myorder")}
        >
          📦 My Orders
        </li>
        {/* sidebar đăng xuất */}
        <li onClick={handleLogout} className="logout-btn">
          🚪 Logout
        </li>
      </ul>
    </aside>
  );
};

Sidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  user: PropTypes.object
};

export default Sidebar;
