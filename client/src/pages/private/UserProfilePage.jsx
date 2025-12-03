import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import AddressModal from "../../components/shared/AddressModal";
import Sidebar from "../../components/profile/Sidebar";
import ProfileSection from "../../components/profile/ProfileSection";
import ManagementSection from "../../components/profile_management/ManagementSection";
import OrderSection from "../../components/order_management/OrderSection";

AddressModal.propTypes = { isOpen: PropTypes.bool, onClose: PropTypes.func, onSave: PropTypes.func };

Sidebar.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

ProfileSection.propTypes = { user: PropTypes.object.isRequired };
ManagementSection.propTypes = { user: PropTypes.object.isRequired, onUserUpdated: PropTypes.func.isRequired };

const UserProfileStyles = () => (
  <style>{`
    .userprofile-page { background-color: #f8f9fa; min-height: 100vh; padding: 40px 20px; font-family: 'Montserrat', sans-serif; }
    .profile-container { max-width: 1200px; margin: 0 auto; display: flex; gap: 30px; margin-top: 80px; }
    .profile-main-content { flex: 1; }
    @media (max-width: 768px) { .profile-container { flex-direction: column; margin-top: 20px; } .sidebar { width: 100%; } }
  `}</style>
);

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) {
        navigate("/auth");
        return;
      }
      try {
        const response = await fetch("/api/customer/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) setUser(data.data);
        else {
          localStorage.removeItem("auth_token");
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("auth_token");
      navigate("/auth");
    }
  };

  const refreshUser = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>Loading...</div>;
  if (!user) return null;

  return (
    <div className="userprofile-page">
      <UserProfileStyles />
      <div className="profile-container">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          onLogout={handleLogout}
          user={user}
        />
        <main className="profile-main-content">
          {activeSection === "profile" && <ProfileSection user={user} />}
          {activeSection === "manage" && <ManagementSection user={user} onUserUpdated={refreshUser} />}
          {activeSection === "myorder" && <OrderSection />}
        </main>
      </div>
    </div>
  );
};

export default UserProfilePage;