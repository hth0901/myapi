import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./BannerSliderTest.module.css";

const BannerSliderTest = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="home-slider">
      <Slider {...settings}>
        <div className={classes.slider_item}>
          <div
            className="img__bg"
            style={{ backgroundImage: "url(images/DaiNoi.jpg)" }}
          ></div>
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>Hoàng cung</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.slider_item}>
          <div
            className="img__bg"
            style={{ backgroundImage: "url(images/MinhMang.jpg)" }}
          ></div>
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>Lăng Vua Minh Mạng</h1>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.slider_item}>
          <div
            className="img__bg"
            style={{ backgroundImage: "url(images/TuDuc.jpg)" }}
          ></div>
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>Lăng Vua Tự Đức</h1>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="item">
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>1</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>2</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="item">
          <div className="slider-content">
            <div className="container">
              <div className="slider-text">
                <h1>3</h1>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className="slider-text">
          <h3>2</h3>
        </div>
        <div className="slider-text">
          <h3>3</h3>
        </div>
        <div className="slider-text">
          <h3>4</h3>
        </div>
        <div className="slider-text">
          <h3>5</h3>
        </div>
        <div className="slider-text">
          <h3>6</h3>
        </div> */}
      </Slider>
    </div>
  );
};

export default BannerSliderTest;
