import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./index.css";

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username || "");
  const [editedEmail, setEditedEmail] = useState(user?.email || "");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSave = () => {
    updateProfile({ username: editedUsername, email: editedEmail });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ minHeight: '100vh', background: 'black' }}>
      {/* Header */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">MY PROFILE</h1>
        <Link to="/" className="home-button-top">
          Home
        </Link>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Profile Info Card */}
        <div className="profile-card-teal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h2 className="profile-section-title">Account Information</h2>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="profile-btn-edit"
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>

          <div>
            <div className="profile-field-modern">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '24px' }}>👤</span>
                <div style={{ flex: 1 }}>
                  <label className="profile-field-label-modern">USERNAME</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedUsername}
                      onChange={(e) => setEditedUsername(e.target.value)}
                      className="modern-input"
                    />
                  ) : (
                    <p className="profile-field-value-modern">{user.username}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="profile-field-modern">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ fontSize: '24px' }}>✉️</span>
                <div style={{ flex: 1 }}>
                  <label className="profile-field-label-modern">EMAIL</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editedEmail}
                      onChange={(e) => setEditedEmail(e.target.value)}
                      className="modern-input"
                    />
                  ) : (
                    <p className="profile-field-value-modern">{user.email}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="profile-quick-links">
          <Link to="/addresses" className="profile-link-card">
            <h3 className="profile-link-title">Manage Addresses</h3>
            <p className="profile-link-subtitle">
              {user.addresses?.length || 0} saved address{user.addresses?.length !== 1 ? 'es' : ''}
            </p>
          </Link>

          <Link to="/payment" className="profile-link-card">
            <h3 className="profile-link-title">Payment Methods</h3>
            <p className="profile-link-subtitle">
              {user.paymentMethods?.length || 0} saved card{user.paymentMethods?.length !== 1 ? 's' : ''}
            </p>
          </Link>
        </div>

        {/* Logout Button */}
        <div style={{ textAlign: 'center', marginTop: '40px', marginBottom: '60px' }}>
          <button
            onClick={handleLogout}
            style={{
              background: '#e53e3e',
              color: 'white',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'Mayrean',
              cursor: 'pointer',
              letterSpacing: '2px',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#c53030'}
            onMouseOut={(e) => e.target.style.background = '#e53e3e'}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
