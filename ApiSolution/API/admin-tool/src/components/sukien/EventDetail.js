import React, { Fragment, useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { Link, useNavigate } from 'react-router-dom'
import classes from '../diemden/DestinationDetailItem.module.css'

import parse from 'html-react-parser'

const BASE_URL = process.env.REACT_APP_URL

const EventDetail = (props) => {
    const { detailData } = props
    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)

    let slider1 = []
    let slider2 = []

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [])
    return (
        <Fragment>
            <div className="hero-wrap layout-page">
                <div className="home-slider">
                    <div className="item">
                        <div
                            className="img__bg"
                            style={{
                                backgroundImage: `url(${BASE_URL}/upload/${detailData.imageUrl})`,
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>{detailData.title}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-destination">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="content-container">
                                <div className="heading-section title-destination">
                                    <h5 className="mb-3">{detailData.title}</h5>
                                </div>
                                <div
                                    className={`content-destination ${classes['main-content']}`}
                                >
                                    {parse(`${detailData.content}`)}
                                </div>
                                <div className="slider-destination">
                                    <Slider
                                        dots={false}
                                        adaptiveHeight={false}
                                        arrows={false}
                                        asNavFor={nav2}
                                        ref={(slider) => (slider1 = slider)}
                                        fade={true}
                                        autoplay={true}
                                        autoplaySpeed={2500}
                                    >
                                        {detailData &&
                                            detailData.listImage &&
                                            detailData.listImage.map((el) => {
                                                return (
                                                    <div key={el.id}>
                                                        <div>
                                                            <img
                                                                src={`${BASE_URL}/upload/${el}`}
                                                                alt="landscape"
                                                                style={{
                                                                    maxHeight:
                                                                        '450px',
                                                                    margin: 'auto',
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </Slider>
                                    <Slider
                                        dots={true}
                                        adaptiveHeight={false}
                                        arrows={false}
                                        asNavFor={nav1}
                                        ref={(slider) => (slider2 = slider)}
                                        slidesToShow={3}
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        centerMode={true}
                                        className={
                                            classes['slick-slide-margin']
                                        }
                                    >
                                        {detailData &&
                                            detailData.listImage &&
                                            detailData.listImage.map((el) => {
                                                return (
                                                    <div key={el.id}>
                                                        <div
                                                            style={{
                                                                height: '125px',
                                                                margin: '0 5px',
                                                                backgroundImage: `url(${BASE_URL}/upload/${el.url})`,
                                                                backgroundSize:
                                                                    'contain',
                                                                backgroundRepeat:
                                                                    'no-repeat',
                                                                backgroundPosition:
                                                                    'center',
                                                            }}
                                                        ></div>
                                                    </div>
                                                )
                                            })}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default EventDetail
