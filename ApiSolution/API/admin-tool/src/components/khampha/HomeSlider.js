import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const HomeSlider = () => {
  return (
    <div className="hero-wrap layout-page">
      <div className="home-slider">
        <Carousel
          showArrows={true}
          showThumbs={false}
          showIndicators={false}
          swipeable={true}
          autoPlay={true}
          interval={2500}
          stopOnHover={false}
          infiniteLoop={true}
        >
          <div>
            <div className="item">
              <div className="overlay"></div>
              <div
                className="img__bg"
                style={{ backgroundImage: "url('images/DaiNoi.jpg')" }}
              ></div>
              <div className="slider-content">
                <div className="container">
                  <div className="slider-text">
                    <h1>Hoàng cung</h1>
                  </div>
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
                  <div className="slider-text">
                    <h1>Lăng Vua Minh Mạng</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="item">
              <div className="overlay"></div>
              <div
                className="img__bg"
                style={{ backgroundImage: "url('images/TuDuc.jpg')" }}
              ></div>
              <div className="slider-content">
                <div className="container">
                  <div className="slider-text">
                    <h1>Lăng Vua Tự Đức</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HomeSlider;
