import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import Star from "../assets/star.svg";
import StarHalf from "../assets/star_half.svg";
import StarOutline from "../assets/star_outline.svg";
import Span1 from "../assets/span-1.svg";
import Span2 from "../assets/span-2.svg";
import Span3 from "../assets/span-3.svg";

const FeedbackSlider = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    responsive: [
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <section id="feedback-section">
        <section className="wrapper">
          <section className="feedback-section">
            <div className="top">
              <div className="violet"></div>
              <h3>Feedback</h3>
            </div>
            <Slider {...settings}>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span1} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Floyd Miles</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span2} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Ronald Richard</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span3} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Savannah Nguyen</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span2} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Savannah Nguyen</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span1} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Ronald Richard</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span3} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Floyd Miles</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span3} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Savannah Nguyen</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span2} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Floyd Miles</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
              <div id="card">
                <div className="top">
                  <div className="left">
                    <img src={Span1} alt="Customer 1" />
                  </div>
                  <div className="right">
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={Star} alt="Rating Star" />
                    <img src={StarHalf} alt="Rating Star" />
                    <img src={StarOutline} alt="Rating Star" />
                  </div>
                </div>
                <h4>Ronald Richard</h4>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Aperiam voluptatem praesentium officia excepturi rem ratione
                  repellendus saepe error, numquam temporibus nihil
                  necessitatibus! Tenetur nam accusantium deleniti illum vel!
                </p>
              </div>
            </Slider>
          </section>
        </section>
      </section>
    </>
  );
};

export default FeedbackSlider;
