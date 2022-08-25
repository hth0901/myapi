import React from "react";

const EventIntroItem = (props) => {
  const { title, place, content, image } = props;
  return (
    <div className="slider_item" data-aos="fade-up">
      <div className="event">
        <div
          href="#"
          className="img img-2"
          style={{ backgroundImage: `url(${image})`, minHeight: '224px'}}
        ></div>
        <div className="text">
          <div className="top-text">
            <h6>
              <a href="#">{title}</a>
            </h6>
            <p className="location Subtitle-2">{place}</p>
          </div>
          <p className="description body-1">{content}</p>
          <p className="btn-link">
            {/* <a className="btn btn-outline-primary button" href="#">
              Xem thêm
            </a> */}
            {/* <Link className="btn btn-outline-primary button">Xem thêm</Link> */}
            <button className="btn btn-outline-primary button">Xem thêm</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventIntroItem;
