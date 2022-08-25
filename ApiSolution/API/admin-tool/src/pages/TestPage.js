// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import React, { useEffect, useState } from "react";

import Slider from "react-slick";

import classes from "./testpage.module.css";

const dummy_data = [1, 2, 3, 4, 5, 6];

const TestPage = (props) => {

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  let slider1 = [];
  let slider2 = [];

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  return (
    <div>
      <h2>Slider Syncing (AsNavFor)</h2>
      <h4>First Slider</h4>
      <Slider asNavFor={nav2} ref={(slider) => (slider1 = slider)}>
        {dummy_data.map((el) => {
          return (
            <div key={el}>
              <div style={{ backgroundColor: "lightblue", height: "300px" }}>
                <h3 style={{ color: "red" }}>{el}</h3>
              </div>
            </div>
          );
        })}
      </Slider>
      <h4>Second Slider</h4>
      <div style={{ width: "500px", backgroundColor: "red" }}>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (slider2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          className={classes["slick-slide-margin"]}
        >
          {dummy_data.map((el) => {
            return (
              <div key={el}>
                <div
                  style={{
                    backgroundColor: "lightblue",
                    height: "300px",
                    margin: "0 10px",
                  }}
                >
                  <h3 style={{ color: "red" }}>{el}</h3>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default TestPage;
