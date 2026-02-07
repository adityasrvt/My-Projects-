import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import "./index.css";

const Payment = () => {
  const { user, addPaymentMethod, removePaymentMethod } = useAuth();
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newPayment, setNewPayment] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    billingZip: ""
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const maskedCard = {
      ...newPayment,
      cardNumber: `**** **** **** ${newPayment.cardNumber.slice(-4)}`,
      originalNumber: newPayment.cardNumber
    };
    addPaymentMethod(maskedCard);
    setNewPayment({
      cardNumber: "",
      cardHolder: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      billingZip: ""
    });
    setIsAdding(false);
  };

  const handleInputChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
    }
    setNewPayment({ ...newPayment, [e.target.name]: value });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'black' }}>
      {/* Header */}
      <div className="profile-page-header">
        <h1 className="profile-page-title">PAYMENT METHODS</h1>
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
        {/* Add New Card Button */}
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
              + Add New Card
            </span>
          </button>
        )}

        {/* Add Payment Form */}
        {isAdding && (
          <div className="profile-card-teal" style={{ marginBottom: '30px' }}>
            <h2 className="profile-section-title">Add Payment Method</h2>
            
            {/* Card Type Icons */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', justifyContent: 'center' }}>
              <div style={{ padding: '8px 16px', background: 'white', borderRadius: '8px', border: '2px solid #4A90E2' }}>
                <span style={{ fontWeight: 'bold', color: '#1434CB' }}>VISA</span>
              </div>
              <div style={{ padding: '8px 16px', background: 'white', borderRadius: '8px', border: '2px solid #EB001B' }}>
                <span style={{ fontWeight: 'bold', color: '#FF5F00' }}>MC</span>
              </div>
              <div style={{ padding: '8px 16px', background: 'white', borderRadius: '8px', border: '2px solid #006FCF' }}>
                <span style={{ fontWeight: 'bold', color: '#006FCF' }}>AMEX</span>
              </div>
              <div style={{ padding: '8px 16px', background: 'white', borderRadius: '8px', border: '2px solid #FF6000' }}>
                <span style={{ fontWeight: 'bold', color: '#FF6000' }}>DISC</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div className="modern-input-group">
                <label className="modern-input-label">💳 Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={newPayment.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  className="modern-input"
                  required
                />
              </div>

              <div className="modern-input-group">
                <label className="modern-input-label">👤 Card Holder Name</label>
                <input
                  type="text"
                  name="cardHolder"
                  value={newPayment.cardHolder}
                  onChange={handleInputChange}
                  placeholder="Enter name on card"
                  className="modern-input"
                  style={{ textTransform: 'uppercase' }}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                <div className="modern-input-group">
                  <label className="modern-input-label">Expiration Date</label>
                  <input
                    type="text"
                    name="expiryMonth"
                    value={newPayment.expiryMonth}
                    onChange={handleInputChange}
                    placeholder="MM"
                    maxLength="2"
                    className="modern-input"
                    required
                  />
                </div>

                <div className="modern-input-group" style={{ paddingTop: '28px' }}>
                  <input
                    type="text"
                    name="expiryYear"
                    value={newPayment.expiryYear}
                    onChange={handleInputChange}
                    placeholder="YYYY"
                    maxLength="4"
                    className="modern-input"
                    required
                  />
                </div>

                <div className="modern-input-group">
                  <label className="modern-input-label">CVV</label>
                  <input
                    type="password"
                    name="cvv"
                    value={newPayment.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="4"
                    className="modern-input"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
                <button type="submit" className="modern-btn-primary">
                  Save Card
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

        {/* Saved Cards */}
        <div style={{ display: 'grid', gap: '20px' }}>
          {user.paymentMethods && user.paymentMethods.length > 0 ? (
            user.paymentMethods.map((payment) => (
              <div key={payment.id} className="profile-card-teal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '40px', 
                      background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px'
                    }}>
                      💳
                    </div>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a1a', marginBottom: '8px' }}>
                        {payment.cardNumber}
                      </h3>
                      <p style={{ color: '#666', fontSize: '15px', marginBottom: '4px' }}>
                        {payment.cardHolder}
                      </p>
                      <p style={{ color: '#888', fontSize: '14px' }}>
                        Expires: {payment.expiryMonth}/{payment.expiryYear}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removePaymentMethod(payment.id)}
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
                No payment methods saved yet. Add your first card above.
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
