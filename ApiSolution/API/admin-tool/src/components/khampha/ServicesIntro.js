import React, { Fragment } from "react";
import ServiceItem from "./ServiceItem";

const DUMMY_DATA = [
  {
    title: "Chụp ảnh lưu niệm trang phục cung đình",
    content:
      "Dịch vụ chụp ảnh nghệ thuật cung đình lưu niệm cùng với các diễn viên và nghệ sĩ với trang phục cung đình đẹp mắt...",
    image: "images/event-3.jpg",
  },
  {
    title: "Ẩm thực Cung đình",
    content:
      "Du khách không nên bỏ qua cơ hội thưởng thức những món ăn cung đình trong không gian của những kiến trúc truyền thống...",
    image: "images/event-2.jpg",
  },
  {
    title: "Thưởng thức trà Cung đình",
    content:
      "Uống trà là một thú chơi thanh đạm và tao nhã của người phương Đông nói chung và người Việt Nam nói riêng...",
    image: "images/event-6.jpg",
  },
  {
    title: "Du lịch di sản Huế bằng xe điện",
    content:
      "Tạo điều kiện cho du khách có cơ hội tham quan khu vực xung quanh Đại Nội và tất cả các điểm du lịch bên trong Đại Nội...",
    image: "images/event-5.jpg",
  },
];

const ServicesIntro = (props) => {
  return (
    <Fragment>
      <section className="ftco-section ftco-services bg-light">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 text-center heading-section heading-section-white">
              <h5>Dịch vụ</h5>
            </div>
          </div>
          <div className="row services d-flex">
            {DUMMY_DATA.map((el, idx) => {
              return (
                <ServiceItem
                  title={el.title}
                  content={el.content}
                  image={el.image}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ServicesIntro;
