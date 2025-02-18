import React from "react";
import "../Css/Banner.css"; // Custom CSS for styling

const Banner = ({ imageUrl }) => {
  return (
    <div className="banner-container">
      <img src={imageUrl} alt="Banner" className="banner-image" />
    </div>
  );
};

export default Banner;
