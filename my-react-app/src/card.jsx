import React from "react";
import slide1 from "./assets/bag1.jpg";
function Card({src,h2}){
return(
    <div className="card">
        <img src={src} />
        <h2>{h2}</h2>
        <h3>$</h3>
    </div>
);
}
export default Card;