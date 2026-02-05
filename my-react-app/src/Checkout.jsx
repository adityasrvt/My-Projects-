import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import "./index.css";

const Checkout = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
    0
  );
  const shipping = 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = () => {
    if (!selectedAddress || !selectedPayment) {
      alert("Please select a shipping address and payment method");
      return;
    }
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-success-container">
        <div className="checkout-success-content">
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <span className="checkmark">✓</span>
            </div>
            <h1 className="success-title">
              ORDER PLACED!
            </h1>
            <p className="success-message">
              Thank you for your purchase. Your order has been confirmed and will be shipped soon.
            </p>
          </div>
          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      {/* Header */}
      <div className="checkout-header">
        <h1 className="checkout-main-title">CHECKOUT</h1>
        <Link to="/cart" className="back-to-cart-btn">
          Back to Cart
        </Link>
      </div>

      <div className="checkout-grid">
        {/* Left Column - Address & Payment */}
        <div className="checkout-left-column">
          {/* Shipping Address Section */}
          <div className="checkout-section">
            <div className="section-header">
              <h2 className="section-title">Shipping Address</h2>
              <Link to="/addresses" className="add-new-link">
                + Add New
              </Link>
            </div>

            {user.addresses && user.addresses.length > 0 ? (
              <div className="address-list">
                {user.addresses.map((address) => (
                  <div
                    key={address.id}
                    onClick={() => setSelectedAddress(address.id)}
                    className={`address-card ${
                      selectedAddress === address.id ? 'selected' : ''
                    }`}
                  >
                    <p className="address-name">{address.fullName}</p>
                    <p className="address-details">
                      {address.street}, {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="address-phone">{address.phone}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">
                No saved addresses. <Link to="/addresses" className="inline-link">Add one now</Link>
              </p>
            )}
          </div>

          {/* Payment Method Section */}
          <div className="checkout-section">
            <div className="section-header">
              <h2 className="section-title">Payment Method</h2>
              <Link to="/payment" className="add-new-link">
                + Add New
              </Link>
            </div>

            {user.paymentMethods && user.paymentMethods.length > 0 ? (
              <div className="payment-list">
                {user.paymentMethods.map((payment) => (
                  <div
                    key={payment.id}
                    onClick={() => setSelectedPayment(payment.id)}
                    className={`payment-card ${
                      selectedPayment === payment.id ? 'selected' : ''
                    }`}
                  >
                    <div className="payment-card-content">
                      <div className="card-icon">💳</div>
                      <div className="card-info">
                        <p className="card-number">{payment.cardNumber}</p>
                        <p className="card-holder">{payment.cardHolder}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">
                No saved payment methods. <Link to="/payment" className="inline-link">Add one now</Link>
              </p>
            )}
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="checkout-right-column">
          <div className="order-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-items">
              {cart.map((item) => (
                <div key={item.id} className="summary-item">
                  <span className="item-name">
                    {item.name} x{item.qty}
                  </span>
                  <span className="item-price">
                    ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="summary-calculations">
              <div className="calc-row">
                <span className="calc-label">Subtotal</span>
                <span className="calc-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span className="calc-label">Shipping</span>
                <span className="calc-value">${shipping.toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span className="calc-label">Tax</span>
                <span className="calc-value">${tax.toFixed(2)}</span>
              </div>
              <div className="calc-row total-row">
                <span className="calc-label-total">Total</span>
                <span className="calc-value-total">${total.toFixed(2)}</span>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
