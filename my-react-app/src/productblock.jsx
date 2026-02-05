import React from "react";
import { Link } from "react-router-dom";   
import "./index.css";
import slide4 from "./assets/bag.png";
import slide5 from "./assets/watch1.jpg";
import slide6 from "./assets/wallet.jpg";
import slide7 from "./assets/jewellery.jpg";
import slide8 from "./assets/jewellery.jpg";

function ProductBlock() {
    return (
        <div className="imgdiv">
          
            
            <Link to="/category/bags">
                <div>
                    <img className="prdimg" src={slide4} />
                    <h1 className="top-2">Bags</h1>
                </div>
            </Link>

            <Link to="/category/watches">
                <div>
                    <img className="prdimg" src={slide5} />
                    <h1 className="top-2">Watches</h1>
                </div>
            </Link>

            <Link to="/category/wallets">
                <div>
                    <img className="prdimg" src={slide6} />
                    <h1 className="top-2">Wallets</h1>
                </div>
            </Link>

            <Link to="/category/jewellery">
                <div>
                    <img className="prdimg" src={slide7} />
                    <h1 className="top-2" >Jewellery</h1>
                </div>
            </Link>
            
        </div>
    );
}

export default ProductBlock;
