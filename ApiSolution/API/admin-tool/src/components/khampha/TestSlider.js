import React from "react";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const TestSlider = (props) => {
  return (
    <div className="layout-page">
      <div className="home-slider">
        <Slide arrows={false}>
          <div>
            <div className="item">
              <div className="overlay"></div>
              <div
                className="img__bg"
                style={{ backgroundImage: "url('images/DaiNoi.jpg')" }}
              ></div>
              <div className="slider-content">
                <div className="container">
                  <div className="slider-text">{/* <h1>Hoàng cung</h1> */}</div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="item">
              <div className="overlay"></div>
              <div
                className="img__bg"
                style={{ backgroundImage: "url('images/MinhMang.jpg')" }}
              ></div>
              <div className="slider-content">
                <div className="container">
                  <div className="slider-text"></div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
      </div>
    </div>
  );
};

export default TestSlider;
