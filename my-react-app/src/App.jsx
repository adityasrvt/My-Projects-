import React from "react";
import { Routes, Route } from "react-router-dom";

import Navigation from "./navigation.jsx";
import Banner from "./banner.jsx";
import ProductBlock from "./productblock.jsx";
import SmallBlock from "./smallblock.jsx";
import Login from "./login.jsx";
import Cart from "./cart.jsx";
import CategoryPage from "./categorypage.jsx";
import Profile from "./Profile.jsx";
import Addresses from "./Addresses.jsx";
import Payment from "./Payment.jsx";
import Checkout from "./Checkout.jsx";
import NewArrivals from "./NewArrivals.jsx";

const Home = () => (
  <>
    <div className="logo">
      <h1>SLINGERS | LUXE</h1>
    </div>
    <Navigation/>
    <Banner />
    <ProductBlock />
    <SmallBlock />
  </>
);

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/:name" element={<CategoryPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
      </Routes>
    </>
  );
}

export default App;
