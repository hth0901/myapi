import React from 'react'
import { Link } from 'react-router-dom'

const DestinationItem = (props) => {
    const { title, content, image, id } = props
    return (
        <div
            className="col-md-4 box-scroll"
            data-aos="fade-up"
            data-aos-offset="350"
        >
            {/* <a href="#" className="destination">
        <div
          className="img d-flex justify-content-star align-items-end"
          style={{ backgroundImage: `url(${image})` }}
        ></div>
        <div className="text">
          <h6>{title}</h6>
          <span className="listing body-1">{content}</span>
        </div>
      </a> */}
            <Link to={`/diem-den/${id}`} className="destination">
                <div
                    className="img d-flex justify-content-star align-items-end"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="text">
                    <h6>{title}</h6>
                    {/* <span className="listing body-1">{content}</span> */}
                </div>
            </Link>
        </div>
    )
}

export default DestinationItem
