import React from "react";
import Like from "../assets/wishlist.svg";

const similarProducts = [
  {
    id: 1,
    title: "Black Sweatshirt with",
    seller: "Jhanvi's Brand",
    price: 123.0,
    image: require("../assets/img-16.jpg"),
  },
  {
    id: 2,
    title: "Line Pattern Black",
    seller: "AS's Brand",
    price: 37.0,
    image: require("../assets/img-17.jpg"),
  },
  {
    id: 3,
    title: "Black Shorts",
    seller: "MM's Brand",
    price: 37.0,
    image: require("../assets/img-18.jpg"),
  },
  {
    id: 4,
    title: "Levender Hoodie with",
    seller: "Nike's Brand",
    price: 119.0,
    image: require("../assets/img-19.jpg"),
  },
];

const SimilarProducts = ({ title }) => {
  return (
    <section id="similar">
      <section className="wrapper">
        <section className="similar">
          <div className="top">
            <div className="violet"></div>
            <h3>{title}</h3>
          </div>
          <ul className="bottom">
            {similarProducts.map((product) => (
              <li key={product.id} style={{ position: "relative" }}>
                <div className="wishImageContainer">
                  <img src={Like} alt="wishlist icon" />
                </div>
                <div className="similarImageContainer">
                  <img src={product.image} alt={product.title} />
                </div>
                <div className="productDetails">
                  <div className="left">
                    <h4>{product.title}</h4>
                    <h5>{product.seller}</h5>
                  </div>
                  <div className="right">${product.price.toFixed(2)}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </section>
  );
};

export default SimilarProducts;
