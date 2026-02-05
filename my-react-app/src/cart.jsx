import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import "./index.css";

const Cart = () => {
  const { cart, removeFromCart, updateQty } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.qty,
    0
  );

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'black' }}>
      {/* Header */}
      <div className="cart-page-header">
        <h1 className="cart-page-title">YOUR CART</h1>
        <Link to="/" className="home-button-top">
          Home
        </Link>
      </div>

      {/* Empty State */}
      {cart.length === 0 && (
        <div className="cart-empty-state">
          <p className="cart-empty-text">Your cart is empty</p>
          <Link to="/" className="cart-btn cart-btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}

      {/* Cart Items */}
      {cart.length > 0 && (
        <>
          <div className="cart-items-container">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-modern">
                {/* Product Image */}
                <div className="cart-item-image-container">
                  <img 
                    src={item.src} 
                    alt={item.name}
                    className="cart-item-image"
                  />
                </div>

                {/* Product Details */}
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">{item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="cart-qty-controls">
                  <button 
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="cart-qty-btn"
                  >
                    −
                  </button>
                  <span className="cart-qty-value">{item.qty}</span>
                  <button 
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="cart-qty-btn"
                  >
                    +
                  </button>
                </div>

                {/* Item Total */}
                <div className="cart-item-total">
                  ${(parseFloat(item.price.replace("$", "")) * item.qty).toFixed(2)}
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="cart-remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">
            <div className="cart-total-row">
              <span className="cart-total-label">Total</span>
              <span className="cart-total-amount">${total.toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <Link to="/" className="cart-btn cart-btn-secondary">
                Continue Shopping
              </Link>
              <button 
                onClick={handleCheckout}
                className="cart-btn cart-btn-primary"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
