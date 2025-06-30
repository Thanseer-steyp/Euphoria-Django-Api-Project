import React, { useEffect, useRef, useState } from "react";
import leftArrow from "../assets/arrow-left.svg";
import rightArrow from "../assets/arrow-right.svg";

// Sample data (replace with real dynamic data)
const sampleArrivals = [
  { id: 1, title: "Knitted Joggers", image: require("../assets/img-1.jpg") },
  { id: 2, title: "Full Sleeve", image: require("../assets/img-3.jpg") },
  { id: 3, title: "Active T-Shirts", image: require("../assets/img-4.jpg") },
  { id: 4, title: "Urban Shirts", image: require("../assets/img-2.jpg") },
  { id: 5, title: "Track Pants", image: require("../assets/img-4.jpg") },
  { id: 6, title: "Full Sleeve", image: require("../assets/img-3.jpg") },
  { id: 7, title: "Urban Shirts", image: require("../assets/img-2.jpg") },
  { id: 8, title: "Knitted Joggers", image: require("../assets/img-1.jpg") },
];

const NewArrivalSection = () => {
  const trackRef = useRef(null);
  const slideRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  const updateSlidesPerView = () => {
    const width = window.innerWidth;
    if (width < 480) return 1;
    if (width < 768) return 2;
    return 4;
  };

  const updateSliderPosition = () => {
    const track = trackRef.current;
    const slide = slideRef.current;
    if (!track || !slide) return;

    const slideWidth = slide.offsetWidth;
    const newTransform = -currentIndex * slideWidth;
    track.style.transform = `translateX(${newTransform}px)`;
  };

  const handleResize = () => {
    const newSlidesPerView = updateSlidesPerView();
    setSlidesPerView(newSlidesPerView);
    updateSliderPosition();
  };

  const nextSlide = () => {
    if (currentIndex < sampleArrivals.length - slidesPerView) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setSlidesPerView(updateSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    updateSliderPosition();
  }, [currentIndex, slidesPerView]);

  return (
    <section id="arrival">
      <section className="wrapper">
        <section className="newArrival">
          <div className="top">
            <div className="violet"></div>
            <h3>New Arrival</h3>
          </div>

          <div className="slider-container">
            <img
              id="prevBtn"
              alt="prev-btn"
              src={leftArrow}
              onClick={prevSlide}
              style={{ cursor: "pointer" }}
            />

            <div className="slider">
              <div className="slider-track" id="sliderTrack" ref={trackRef}>
                {sampleArrivals.map((item, index) => (
                  <div
                    className="slide"
                    key={item.id}
                    ref={index === 0 ? slideRef : null}
                  >
                    <img src={item.image} alt={item.title} />
                    <h3>{item.title}</h3>
                  </div>
                ))}
              </div>
            </div>

            <img
              id="nextBtn"
              alt="next-btn"
              src={rightArrow}
              onClick={nextSlide}
              style={{ cursor: "pointer" }}
            />
          </div>
        </section>
      </section>
    </section>
  );
};

export default NewArrivalSection;
