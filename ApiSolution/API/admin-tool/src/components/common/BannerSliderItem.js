import React from "react";

const BannerSliderItem = (props) => {
  const { title, image } = props;
  return (
    <div className="slider_item">
      {/* <div className="overlay"></div> */}
      <div
        className="img__bg"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="slider-content">
        <div className="container">
          <div className="slider-text">
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSliderItem;
