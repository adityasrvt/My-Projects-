import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "./products";
import { useCart } from "./CartContext";
import "./index.css";

const CATEGORY_LIST = [
  { key: "all", label: "All" },
  { key: "bags", label: "Bags" },
  { key: "watches", label: "Watches" },
  { key: "wallets", label: "Wallets" },
  { key: "jewellery", label: "Jewellery" },
];

function CategoryPage() {
  const { name } = useParams();
  const { addToCart, cart } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({});

  let items;
  if (name === "all") {
    items = Object.values(PRODUCTS).flat();
  } else {
    items = PRODUCTS[name];
  }

  if (!items) return <h1 style={{ color: "white" }}>Category not found</h1>;

  // Filter items based on search query
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getQuantity = (itemId) => {
    return quantities[itemId] || 1;
  };

  const incrementQuantity = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 1) + 1
    }));
  };

  const decrementQuantity = (itemId) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(1, (prev[itemId] || 1) - 1)
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = getQuantity(item.id);
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    // Reset quantity after adding to cart
    setQuantities(prev => ({
      ...prev,
      [item.id]: 1
    }));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <div className="category-page">
      <aside className="category-sidebar">
        <h2 className="sidebar-title">SHOP BY CATEGORY</h2>
        <div className="backbutton">
        <Link className="homepg" to="/">HOME</Link>
        </div>
        <ul className="sidebar-list">
          {CATEGORY_LIST.map((cat) => (
            <li key={cat.key}>
              <Link
                to={`/category/${cat.key}`}
                className={
                  name === cat.key || (name === undefined && cat.key === "all")
                    ? "sidebar-link active"
                    : "sidebar-link"
                }
              >
                {cat.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

      <main className="category-main">
        <h1 className="category-title-centered">
          {name.toUpperCase()}
        </h1>

        {/* Search Bar */}
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input-modern"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bags-grid">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="card">
                <img src={item.src} alt={item.name} className="card-img" />
                <h2>{item.name}</h2>
                <h3>{item.price}</h3>
                
                {/* Quantity Counter */}
                <div className="quantity-controls">
                  <button 
                    className="qty-btn"
                    onClick={() => decrementQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="qty-display">{getQuantity(item.id)}</span>
                  <button 
                    className="qty-btn"
                    onClick={() => incrementQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            ))
          ) : (
            <p style={{ color: 'white', gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
              No products found matching "{searchQuery}"
            </p>
          )}
        </div>
      </main>

      {/* Floating Cart Button */}
      <Link to="/cart" className="floating-cart-btn">
        🛒
        {cartItemCount > 0 && (
          <span className="cart-badge">{cartItemCount}</span>
        )}
      </Link>
    </div>
  );
}

export default CategoryPage;
