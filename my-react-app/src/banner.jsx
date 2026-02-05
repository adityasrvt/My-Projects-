import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from "./assets/bag1.jpg";
import slide2 from "./assets/watch.jpg";
import slide3 from "./assets/jewwlery.jpg";
import { Link } from "react-router-dom";

function Banner() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };

    return (
        <div className="bannerheading">
            <h1>THE LUXURY STORE</h1>
            <p>Experience curated elegance. Discover exclusive collections of timeless design, rare craftsmanship, and high quality. Each piece tells a luxury story, redefined.</p>

            <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <div className="slide-content">
                            <img src={slide2} alt="Luxury slide 1" className="slide-img" />
                        </div>
                    </div>
                    <div>
                        <div className="slide-content">
                            <img src={slide1} alt="Luxury slide 1" className="slide-img" />
                        </div>
                    </div>
                    <div>
                        <div className="slide-content">
                            <img src={slide3} alt="Luxury slide 1" className="slide-img" />
                        </div>
                    </div>

                </Slider>
            </div>
            <div className="buttonhome1">
                <Link to="/new-arrivals">
                    <button className="homebutton">
                        EXPLORE NEW ARRIVALS
                    </button>
                </Link>
            </div>

        </div>
    );
}


export default Banner;
