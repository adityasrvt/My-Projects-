import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";
import { PRODUCTS } from "./products";
import "./index.css";

const NewArrivals = () => {
  const { addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");

  // Get some products as "new arrivals" - you can mark specific products as new in the future
  const newArrivals = [
    ...PRODUCTS.bags.slice(0, 2),
    ...PRODUCTS.watches.slice(0, 2),
    ...PRODUCTS.jewellery.slice(0, 2),
  ];

  // Filter based on search
  const filteredItems = newArrivals.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'black', paddingTop: '80px' }}>
      {/* Header */}
      <div className="logo">
        <h1>SLINGERS | LUXE</h1>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="category-title-centered">
            NEW ARRIVALS
          </h1>
          <p style={{ color: '#888', fontSize: '18px', fontFamily: 'Segoe UI' }}>
            Discover our latest collection of luxury items
          </p>
        </div>

        {/* Search Bar */}
        <div className="search-container" style={{ marginBottom: '50px' }}>
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input-modern"
            placeholder="Search new arrivals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Back Button */}
        <div style={{ marginBottom: '30px' }}>
          <Link
            to="/"
            className="border border-cyan-400 px-6 py-2 hover:bg-cyan-400 hover:text-black transition"
            style={{ 
              fontFamily: 'Mayrean',
              color: 'white',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            ← Back to Home
          </Link>
        </div>

        {/* Products Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '30px',
            marginTop: '30px'
          }}
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="card">
                <div style={{ position: 'relative' }}>
                  <span 
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      fontFamily: 'Segoe UI'
                    }}
                  >
                    NEW
                  </span>
                  <img src={item.src} alt={item.name} className="card-img" />
                </div>
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1/-1', 
              textAlign: 'center', 
              padding: '60px 20px',
              color: 'white'
            }}>
              <p style={{ fontSize: '18px', fontFamily: 'Mayrean' }}>
                No products found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
