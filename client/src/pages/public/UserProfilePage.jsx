import React, { useState } from "react";
import Sidebar from "../../components/profile/Sidebar.jsx";
import ProfileSection from "../../components/profile/ProfileSection.jsx";
import ManagementSection from "../../components/profile_management/ManagementSection.jsx";
import OrderSection from "../../components/order_management/OrderSection.jsx";

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <div className="container">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main className="main-content">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "manage" && <ManagementSection />}
        {activeSection === "myorder" && <OrderSection />}
      </main>
    </div>
  );
};

export default UserProfilePage;
