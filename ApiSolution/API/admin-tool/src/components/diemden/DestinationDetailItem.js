import React, { Fragment, useRef, useEffect, useState } from 'react'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useDispatch, useSelector } from 'react-redux'
import { placeCartActions } from '../../store/placeCart-slice'
import { Link, useNavigate } from 'react-router-dom'
import { truyVanDanhSachDiaDiem } from '../../store/diadiem-actions'

import classes from './DestinationDetailItem.module.css'

import parse from 'html-react-parser'

const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const DestinationDetailItem = (props) => {
    const dispatch = useDispatch()
    const history = useNavigate()
    const { detailData } = props
    const adultNumberRef = useRef()
    const childrenNumberRef = useRef()

    const [nav1, setNav1] = useState(null)
    const [nav2, setNav2] = useState(null)

    const lstRelate = useSelector((state) => state.diadiem.danhsach)

    let slider1 = []
    let slider2 = []

    useEffect(() => {
        setNav1(slider1)
        setNav2(slider2)
    }, [])

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiem())
    }, [])
    const arrRelate = lstRelate.filter(
        (el) => el.slideShow === '1' && el.id !== detailData.id
    )
    // console.log(arrRelate);

    const submitHandler = (evt) => {
        evt.preventDefault()
        const adultNumber = +adultNumberRef.current.value
        const childrenNumber = +childrenNumberRef.current.value
        if (adultNumber === 0 && childrenNumber === 0) {
            return
        }
        console.log(detailData)
        // dispatch(
        //     placeCartActions.replaceCartItem({
        //         selectedPlace: { ...detailData },
        //         adultCount: adultNumber,
        //         childrenCount: childrenNumber,
        //     })
        // )
        // history('/mua-ve')
    }

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
                                    {/* <p>{detailData.content}</p> */}
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
                                            detailData.lstImage &&
                                            detailData.lstImage.map((el) => {
                                                return (
                                                    <div key={el.id}>
                                                        <div>
                                                            <img
                                                                src={`${BASE_URL}/upload/${el.url}`}
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
                                            detailData.lstImage &&
                                            detailData.lstImage.map((el) => {
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
                                {/* <div className="map-destination" style={{ marginTop: "45px" }}>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.73066557074!2d107.56687951526739!3d16.387676935176795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3141a48171bcf4f9%3A0xaefcad54b905fa88!2zTMSDbmcgbeG7mSBIb8OgbmcgxJHhur8gTWluaCBN4bqhbmc!5e0!3m2!1svi!2s!4v1639730150824!5m2!1svi!2s"
                    width="100%"
                    height="415"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div> */}
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="order-form">
                                <form onSubmit={submitHandler}>
                                    {/* <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Đối tượng</label>
                    <div className="col-sm-8">
                      <select className="custom-select">
                        <option selected>Khách Quốc tế</option>
                        <option value="1">Khách nội địa</option>
                      </select>
                    </div>
                  </div> */}
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">
                                            Người lớn
                                        </label>
                                        <div className="col-sm-3">
                                            <input
                                                ref={adultNumberRef}
                                                type="number"
                                                min="0"
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <div className="col-sm-5">
                                            X{' '}
                                            <span>
                                                {numberWithCommas(
                                                    detailData.adultPrice
                                                )}
                                            </span>{' '}
                                            VNĐ
                                        </div> */}
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">
                                            Trẻ em
                                        </label>
                                        <div className="col-sm-3">
                                            <input
                                                ref={childrenNumberRef}
                                                type="number"
                                                min="0"
                                                className="form-control"
                                            />
                                        </div>
                                        {/* <div className="col-sm-5">
                                            X{' '}
                                            <span>
                                                {numberWithCommas(
                                                    detailData.childrenPrice
                                                )}
                                            </span>{' '}
                                            VNĐ
                                        </div> */}
                                    </div>
                                    {/* <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Dịch vụ</label>
                    <div className="col-sm-8">
                      <select className="custom-select">
                        <option selected>Hướng dẫn thuyết minh</option>
                        <option value="1">Chụp ảnh</option>
                      </select>
                    </div>
                  </div> */}
                                    <div className="form-group text-right">
                                        {/* <a href="#" className="btn btn-outline-primary mr-2">
                      Thêm vào giỏ hàng
                    </a> */}
                                        {/* <a href="#" className="btn btn-primary">
                      Đặt ngay
                    </a> */}
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                        >
                                            Đặt ngay
                                        </button>
                                    </div>
                                </form>
                            </div>
                            <div className="related-destination">
                                <div className="row">
                                    {arrRelate.map((el) => {
                                        return (
                                            <div
                                                className="col-md-12 box-scroll animated"
                                                key={el.id}
                                            >
                                                <Link
                                                    to={`/diem-den/${el.id}`}
                                                    className="destination"
                                                >
                                                    <div
                                                        className="img d-flex justify-content-star align-items-end"
                                                        style={{
                                                            backgroundImage: `url(${BASE_URL}/upload/${el.imageUrl})`,
                                                        }}
                                                    ></div>
                                                    <div className="text">
                                                        <h6>{el.title}</h6>
                                                        <span className="listing body-1">
                                                            {el.description}
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default DestinationDetailItem
