import { useState } from "react";
import facebook from "../assets/facebook.svg";
import instagram from "../assets/instagram.svg";
import twitter from "../assets/twitter.svg";
import linkedin from "../assets/linkedin.svg";
import playstore from "../assets/playstore.svg";
import phone from "../assets/phone.svg";
import arrowDown from "../assets/arrow-down.svg";

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer>
      <div className="top">
        <ul>
          <h3>Need Help</h3>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">Track Order</a>
          </li>
          <li>
            <a href="">Returns & Refunds</a>
          </li>
          <li>
            <a href="">FAQ's</a>
          </li>
          <li>
            <a href="">Career</a>
          </li>
        </ul>
        <ul>
          <h3>Company</h3>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Euphoria Blog</a>
          </li>
          <li>
            <a href="">Euphoriastan</a>
          </li>
          <li>
            <a href="">Collaboration</a>
          </li>
          <li>
            <a href="">Media</a>
          </li>
        </ul>
        <ul>
          <h3>More Info</h3>
          <li>
            <a href="">Terms and Conditions</a>
          </li>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">Shipping Policy</a>
          </li>
          <li>
            <a href="">Sitemap</a>
          </li>
        </ul>
        <ul>
          <h3>Location</h3>
          <li>
            <a href="">support@euphoria.in</a>
          </li>
          <li>
            <a href="">Eklingpura Choraha, Ahammed Main Road</a>
          </li>
          <li>
            <a href="">(NH 8-Near Mahadev Hotel) Udaipur, India-313002</a>
          </li>
        </ul>
      </div>

      <div className="middle">
        <ul className="left">
          <li>
            <a href="">
              <img src={facebook} alt="Facebook" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={instagram} alt="Instagram" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={twitter} alt="Twitter" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={linkedin} alt="Linkedin" />
            </a>
          </li>
        </ul>

        <div className="right">
          <h3>Download The App</h3>
          <ul className="apps">
            <li>
              <a href="">
                <img src={playstore} alt="Playstore" />
                <div className="right">
                  <small>Android app on</small>
                  <h5>Google Play</h5>
                </div>
              </a>
            </li>
            <li>
              <a href="">
                <img src={phone} alt="Appstore" />
                <div className="right">
                  <small>Available on the</small>
                  <h5>App Store</h5>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="popular">
        <div className="top" onClick={() => setIsOpen(!isOpen)}>
          <h3>Popular Categories</h3>
          <img
            src={arrowDown}
            alt="Arrow-Btn"
            className={isOpen ? "rotate" : ""}
          />
        </div>
        <ul className={`toggleDown ${isOpen ? "show" : ""}`}>
          <li>
            <a href="">Contact Us</a>
          </li>
          <li>
            <a href="">About Us</a>
          </li>
          <li>
            <a href="">Terms and Conditions</a>
          </li>
          <li>
            <a href="">Privacy Policy</a>
          </li>
          <li>
            <a href="">FAQ's</a>
          </li>
          <li>
            <a href="">Location</a>
          </li>
          <li>
            <a href="">Branches</a>
          </li>
        </ul>
      </div>

      <h5>Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</h5>
    </footer>
  );
}
