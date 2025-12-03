import React, { useState } from "react";
import Sidebar from "../../components/profile/Sidebar.jsx";
import ProfileSection from "../../components/profile/ProfileSection.jsx";
import ManagementSection from "../../components/profile_management/ManagementSection.jsx";
import OrderSection from "../../components/order_management/OrderSection.jsx";

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  return (
    <div className="userprofile-page">
      <div className="profile-container">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
        />
        <main className="profile-main-content">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "manage" && <ManagementSection />}
          {activeSection === "myorder" && <OrderSection />}
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;
// import React, { useState } from "react";
// import Sidebar from "../../components/profile/Sidebar.jsx";
// import ProfileSection from "../../components/profile/ProfileSection.jsx";
// import ManagementSection from "../../components/profile_management/ManagementSection.jsx";
// import OrderSection from "../../components/order_management/OrderSection.jsx";

// const UserProfilePage = () => {
//   const [activeSection, setActiveSection] = useState("profile");

//   return (
//     <div className="blumii-page">
//       <div className="profile-container">
//         <Sidebar
//           activeSection={activeSection}
//           setActiveSection={setActiveSection}
//         />

//         <main className="profile-main-content">
//           {activeSection === "profile" && <ProfileSection />}
//           {activeSection === "manage" && <ManagementSection />}
//           {activeSection === "myorder" && <OrderSection />}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserProfilePage;
