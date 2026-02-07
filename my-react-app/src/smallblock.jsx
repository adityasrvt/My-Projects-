import React from "react";
import { Link } from "react-router-dom";   
import slide1 from "./assets/person.png";
import slide2 from "./assets/shopping-bag.png";
import "./index.css";

function SmallBlock() {
  return (
    <div className="cartlogin">
      <Link to="/login">
        <img className="login" src={slide1} alt="login" />
      </Link>

      <Link to="/cart">
        <img className="login" src={slide2} alt="cart" />
      </Link>
    </div>
  );
}

export default SmallBlock;
