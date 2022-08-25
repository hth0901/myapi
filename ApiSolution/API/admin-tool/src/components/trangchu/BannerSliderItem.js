import React from "react";

import classes from "./BannerSliderItem.module.css";

const BannerSliderItem = (props) => {
  const { title, image } = props;
  return (
    <div className={classes.slider_item}>
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
