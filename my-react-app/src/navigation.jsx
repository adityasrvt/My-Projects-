import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import "./index.css";

function Navigation() {
  const { user } = useAuth();
  const { cart } = useCart();
  
  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="navigation">
      <nav>
        {/* CATEGORY WITH DROPDOWN */}
        <div className="category-wrapper">
          <a>CATEGORY</a>

          <div className="category-popup">
            <Link to="/category/bags">Bags</Link>
            <Link to="/category/watches">Watches</Link>
            <Link to="/category/jewellery">Jewellery</Link>
            <Link to="/category/wallets">Wallets</Link>
          </div>
        </div>

        <Link to="/category/all">SHOP</Link>
        
        <Link to="/cart" style={{ position: 'relative' }}>
          CART
          {cartItemCount > 0 && (
            <span 
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'cyan',
                color: 'black',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 'bold'
              }}
            >
              {cartItemCount}
            </span>
          )}
        </Link>

        {user ? (
          <Link to="/profile">PROFILE</Link>
        ) : (
          <Link to="/login">LOGIN</Link>
        )}
      </nav>
    </div>
  );
}

export default Navigation;
