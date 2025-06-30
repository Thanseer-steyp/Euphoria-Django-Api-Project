import React from "react";
import bg2 from "../assets/bg-2.jpg";
import bg3 from "../assets/bg-3.jpg";

const ExploreSection = () => {
  return (
    <section id="explore">
      <section className="wrapper">
        <section className="exploreItems">
          <div className="left" style={{ backgroundImage: `url(${bg2})` }}>
            <h6>Low Price</h6>
            <h2>High Coziness</h2>
            <h3>UPTO 50% OFF</h3>
            <a href="#">Explore Items</a>
          </div>
          <div className="right" style={{ backgroundImage: `url(${bg3})` }}>
            <h6>Beyoung Presents</h6>
            <h2>Breezy Summer Style</h2>
            <h3>UPTO 50% OFF</h3>
            <a href="#">Explore Items</a>
          </div>
        </section>
      </section>
    </section>
  );
};

export default ExploreSection;
