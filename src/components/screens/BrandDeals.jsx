import React from "react";

const brands = [
  { id: 1, title: "Nike", image: require("../assets/nike.jpg") },
  { id: 2, title: "H&M", image: require("../assets/H&M.jpg") },
  { id: 3, title: "Levis", image: require("../assets/levis.jpg") },
  { id: 4, title: "US Polo", image: require("../assets/USPA.jpg") },
  { id: 5, title: "Puma", image: require("../assets/puma.jpg") },
];

const BrandDeals = () => {
  return (
    <section id="brandDeals">
      <section className="wrapper">
        <section className="brandDeals">
          <h2>Top Brands Deal</h2>
          <h6>
            Up To <b>60%</b> off on brands
          </h6>
          <ul className="brands">
            {brands.map((brand) => (
              <li key={brand.id}>
                <img src={brand.image} alt={`Brand ${brand.id}`} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
};

export default BrandDeals;
