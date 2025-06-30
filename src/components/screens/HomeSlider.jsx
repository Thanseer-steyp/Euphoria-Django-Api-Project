import React, { useEffect, useRef, useState } from "react";
import leftArrow from "../assets/left-arrow-bold.svg";
import rightArrow from "../assets/right-arrow-bold.svg";
import bg1 from "../assets/bg-1.jpg";
import bg2 from "../assets/bg-2.jpg";

const HomeSlider = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 2;

  const showSlide = (index) => {
    const newIndex = (index + totalSlides) % totalSlides;
    setCurrentIndex(newIndex);
    const offset = `-${newIndex * 100}%`;
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(${offset})`;
    }
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === newIndex);
    });
  };

  const nextSlide = () => showSlide(currentIndex + 1);
  const prevSlide = () => showSlide(currentIndex - 1);

  useEffect(() => {
    const interval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    const container = document.querySelector(".slider-container");
    const indicatorContainer = document.createElement("div");
    indicatorContainer.classList.add("dots-container");

    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === 0) dot.classList.add("active");
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", () => showSlide(i));
      indicatorContainer.appendChild(dot);
    }

    container.appendChild(indicatorContainer);

    return () => {
      container.removeChild(indicatorContainer);
    };
  }, []);

  return (
    <section className="slider-section">
      <div className="slider-container">
        <div className="slider" ref={sliderRef}>
          <div
            className="slide slide1"
            style={{ backgroundImage: `url(${bg1})` }}
          >
            <div className="content">
              <h5>T-Shirt / Tops</h5>
              <h1>Summer Value Pack</h1>
              <h4>cool / colorful / comfy</h4>
              <a href="#" className="button">
                Shop Now
              </a>
            </div>
          </div>
          <div
            className="slide slide2"
            style={{ backgroundImage: `url(${bg2})` }}
          >
            <div className="content">
              <h5>Jeans / Tops</h5>
              <h1>Summer Combo Pack</h1>
              <h4>stylish / trendy / branded</h4>
              <a href="#" className="button">
                Shop Now
              </a>
            </div>
          </div>
        </div>

        <img
          className="prev"
          src={leftArrow}
          alt="prev-btn"
          onClick={prevSlide}
        />
        <img
          className="next"
          src={rightArrow}
          alt="next-btn"
          onClick={nextSlide}
        />
      </div>
    </section>
  );
};

export default HomeSlider;
