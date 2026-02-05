import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./index.css";

const Addresses = () => {
  const { user, addAddress, removeAddress } = useAuth();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: ""
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(newAddress);
    setNewAddress({
      fullName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: ""
    });
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'black' }}>
      {/* Header */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">MY ADDRESSES</h1>
        <div style={{ position: 'absolute', top: '30px', right: '30px', display: 'flex', gap: '15px' }}>
          <Link to="/profile" className="home-button-top" style={{ position: 'static' }}>
            Back
          </Link>
          <Link to="/" className="home-button-top" style={{ position: 'static' }}>
            Home
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Add New Address Button */}
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            style={{
              width: '100%',
              border: '3px dashed cyan',
              background: 'transparent',
              borderRadius: '15px',
              padding: '40px',
              marginBottom: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(0, 255, 255, 0.05)'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            <span style={{ color: 'cyan', fontSize: '28px', fontFamily: 'Mayrean', letterSpacing: '2px' }}>
              + Add New Address
            </span>
          </button>
        )}

        {/* Add Address Form */}
        {isAdding && (
          <div className="profile-card-teal" style={{ marginBottom: '30px' }}>
            <h2 className="profile-section-title">Add New Address</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="modern-input-group">
                  <label className="modern-input-label">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={newAddress.fullName}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  />
                </div>

                <div className="modern-input-group">
                  <label className="modern-input-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newAddress.phone}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  />
                </div>
              </div>

              <div className="modern-input-group">
                <label className="modern-input-label">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className="modern-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div className="modern-input-group">
                  <label className="modern-input-label">City</label>
                  <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  />
                </div>

                <div className="modern-input-group">
                  <label className="modern-input-label">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={newAddress.state}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  />
                </div>

                <div className="modern-input-group">
                  <label className="modern-input-label">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={newAddress.zipCode}
                    onChange={handleInputChange}
                    className="modern-input"
                    required
                  />
                </div>
              </div>

              <div className="modern-input-group">
                <label className="modern-input-label">Country</label>
                <input
                  type="text"
                  name="country"
                  value={newAddress.country}
                  onChange={handleInputChange}
                  className="modern-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="modern-btn-primary">
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="modern-btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Saved Addresses */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {user.addresses && user.addresses.length > 0 ? (
            user.addresses.map((address) => (
              <div key={address.id} className="profile-card-teal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1a1a1a', marginBottom: '15px', letterSpacing: '1px' }}>
                      {address.fullName}
                    </h3>
                    <p style={{ color: '#4a4a4a', marginBottom: '8px', fontSize: '16px' }}>
                      {address.street}
                    </p>
                    <p style={{ color: '#4a4a4a', marginBottom: '8px', fontSize: '16px' }}>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p style={{ color: '#4a4a4a', marginBottom: '8px', fontSize: '16px' }}>
                      {address.country}
                    </p>
                    <p style={{ color: '#666', fontSize: '15px', marginTop: '10px' }}>
                      📞 {address.phone}
                    </p>
                  </div>
                  <button
                    onClick={() => removeAddress(address.id)}
                    className="cart-remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            !isAdding && (
              <p style={{ textAlign: 'center', color: '#888', padding: '60px 20px', fontSize: '18px', fontFamily: 'Segoe UI' }}>
                No addresses saved yet. Add your first address above.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Addresses;
