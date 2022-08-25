import React, { useEffect, useRef, useState } from "react";

const ServiceItem = (props) => {
  const aRef = useRef();
  const [imgHeight, setImgHeight] = useState(250);
  const { title, content, image } = props;

  const resizeHandler = (evt) => {
    // console.log(el.clientWidth);
    if (aRef.current && aRef.current.clientWidth) {
      const curWidth = aRef.current.clientWidth;
      setImgHeight(curWidth);
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="col-md-4 d-flex" data-aos="fade-up">
      <div className="services-entry align-self-stretch">
        <div className="img-services">
          {/* <a
            ref={aRef}
            href="dichvu_detail.html"
            className="img"
            style={{
              backgroundImage: `url(${image})`,
              height: `${imgHeight}px`,
            }}
          ></a> */}
          <div className="img" ref={aRef} style={{
              backgroundImage: `url(${image})`,
              height: `${imgHeight}px`,
          }}>

          </div>
        </div>
        <div className="text text-services d-block">
          <h6 className="heading">
            {/* <a href="#">{title}</a> */}
            <span>{title}</span>
          </h6>
          <p className="description body-1">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
