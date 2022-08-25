import React from 'react'
import { Link } from 'react-router-dom'

const EventItem = (props) => {
    const { id, title, subtitle, content, image } = props
    return (
        <div className="col-md-4 box-scroll" data-aos="fade-up">
            <Link to={`/su-kien/${id}`} className="destination events">
                <div
                    className="img d-flex justify-content-star align-items-end"
                    style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="text">
                    <h6>{title}</h6>
                    <span className="location subtitle-2">{subtitle}</span>
                    {/* <span className="listing body-1">{content}</span> */}
                </div>
            </Link>
        </div>
    )
}

export default EventItem
