import { useState } from "react";
import ArrowDown from "../assets/arrow-down.svg";
import Demo1 from "../assets/img-7.jpg";
import Demo2 from "../assets/img-8.jpg";

function ImageSelector({ mainImage }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const images = [mainImage, Demo1, Demo2];

  const handleUpClick = () => {
    if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
  };

  const handleDownClick = () => {
    if (selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1);
  };

  return (
    <div className="left">
      <ul>
        {images.map((img, index) => (
          <li key={index} className={index === selectedIndex ? "selected" : ""}>
            <img src={img} alt={`Product ${index}`} />
          </li>
        ))}
      </ul>
      <img
        className="up"
        src={ArrowDown}
        alt="Up Arrow"
        onClick={handleUpClick}
      />
      <img
        className="down"
        src={ArrowDown}
        alt="Down Arrow"
        onClick={handleDownClick}
      />
    </div>
  );
}

export default ImageSelector;
