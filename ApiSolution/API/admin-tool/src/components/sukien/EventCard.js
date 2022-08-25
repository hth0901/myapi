import React from 'react'
import { Link } from 'react-router-dom'

const EventCart = (props) => {
    const { title, content, images } = props

    return (
        <div
            className="col-md-4 box-scroll"
            data-aos="fade-up"
            data-aos-offset="350"
        >
            <Link to={`/su-kien/${id}`} className="destination events">
                <div
                    className="img d-flex justify-content-star align-items-end"
                    style={{ backgroundImage: `url(${image[0] || ''})` }}
                ></div>
                <div className="text">
                    <h6>{title}</h6>
                    <span className="listing body-1">{content}</span>
                </div>
            </Link>
        </div>
    )
}

export default EventCart
