import React from "react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="sidebar">
      <img
        src="https://cdn-icons-png.flaticon.com/512/2922/2922561.png"
        alt="avatar"
      />
      <h3>Nguyen Thi Anh Thu</h3>
      <p>_at.ngn09</p>

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
      </ul>
    </aside>
  );
};

export default Sidebar;
