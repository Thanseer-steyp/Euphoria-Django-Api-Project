import React from "react";
import bannerImage from "../assets/bg-5.jpg";
import bannerImage2 from "../assets/bg-4.jpg"; // Ensure this path is correct

const BannerSection = () => {
  return (
    <section id="banner">
      <section className="wrapper">
        <section className="banner">
          <div
            className="left"
            style={{ backgroundImage: `url(${bannerImage2})` }}
          >
            <div className="content">
              <h2>WE MADE YOUR EVERYDAY FASHION BETTER!</h2>
              <p>
                In our journey to improve everyday fashion, euphoria presents
                EVERYDAY wear range - Comfortable &amp; Affordable fashion 24/7
              </p>
              <a href="#" className="button">
                Shop Now
              </a>
            </div>
          </div>
          <div className="right">
            <img src={bannerImage} alt="Fashion" />
          </div>
        </section>
      </section>
    </section>
  );
};

export default BannerSection;
