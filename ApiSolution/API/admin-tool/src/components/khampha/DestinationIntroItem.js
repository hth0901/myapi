import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const DestinationIntroItem = (props) => {
  const { title, description, image, id } = props;

  let shortDesc = "";
  if (description.length > 100) {
    const tempStr = description.substr(0, 100);
    const lidx = tempStr.lastIndexOf(" ");
    shortDesc = tempStr.substr(0, lidx);
    shortDesc = `${shortDesc} ...`;
  } else {
    shortDesc = description;
  }

  const aRef = useRef();

  const [imgHeight, setImgHeight] = useState(250);

  /*
  var imgWidth = $('.destination .img').width();
      var heightimg = $(".destination .img");
      var heights = imgWidth / 0.749;
      for (var i = 0; i < heightimg.length; i++) {
        heightimg[i].style.height = heights + "px";
      }
  */

  const resizeHandler = (evt) => {
    if (aRef.current && aRef.current.clientWidth) {
      const curWidth = aRef.current.clientWidth;
      setImgHeight(curWidth / 0.749);
    }
  };

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <div className="slider_item" style={{ margin: "0 32px" }}>
      <div className="destination">
        <Link
          to={`/diem-den/${id}`}
          ref={aRef}
          className="img d-flex justify-content-star align-items-end"
          style={{ backgroundImage: `url(${image})`, height: `${imgHeight}px` }}
        >
          <div className="overley"></div>
          <div className="text p-3">
            <h6>{title}</h6>
            <span className="listing body-1">{shortDesc}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DestinationIntroItem;
