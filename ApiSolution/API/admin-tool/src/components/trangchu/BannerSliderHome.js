import React from "react";
import BannerSliderItem from "./BannerSliderItem";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DUMMY_DATA = [
  {
    title: "Hoàng Cung",
    image: "images/DaiNoi.jpg",
  },
  {
    title: "Lăng vua Minh Mạng",
    image: "images/MinhMang.jpg",
  },
  {
    title: "Lăng vua Tự Đức",
    image: "images/TuDuc.jpg",
  },
];

const BannerSliderHome = (props) => {
  return (
    <div className="home-slider">
      <Slider
        {...{
          dots: false,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
        }}
      >
        {DUMMY_DATA.map((el, idx) => {
          return (
            <BannerSliderItem title={el.title} image={el.image} key={idx} />
          );
        })}
      </Slider>
    </div>
  );
};

export default BannerSliderHome;
