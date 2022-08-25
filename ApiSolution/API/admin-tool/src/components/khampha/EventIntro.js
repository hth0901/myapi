import React, { Fragment, useEffect } from 'react'
// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
import EventIntroItem from './EventIntroItem'

import { useDispatch, useSelector } from 'react-redux'
import { truyvanDanhSachSuKien } from '../../store/sukien-action'

import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const BASE_URL = process.env.REACT_APP_URL

const DUMMY_DATA = [
    {
        title: 'Biểu diễn Nhã nhạc',
        place: 'Nhà hát Duyệt Thị Đường',
        content:
            'Là di sản văn hóa phi vật thể được UNESCO công nhận và là nét đẹp văn hóa nghệ thuật đáng tự hào của Việt Nam.',
        image: 'images/event-1.jpg',
    },
    {
        title: 'Biểu diễn Nhã nhạc',
        place: 'Nhà hát Duyệt Thị Đường',
        content:
            'Là di sản văn hóa phi vật thể được UNESCO công nhận và là nét đẹp văn hóa nghệ thuật đáng tự hào của Việt Nam.',
        image: 'images/event-2.jpg',
    },
    {
        title: 'Biểu diễn Nhã nhạc',
        place: 'Nhà hát Duyệt Thị Đường',
        content:
            'Là di sản văn hóa phi vật thể được UNESCO công nhận và là nét đẹp văn hóa nghệ thuật đáng tự hào của Việt Nam.',
        image: 'images/event-3.jpg',
    },
]

const EventIntro = (props) => {
    const dispatch = useDispatch()

    const items = useSelector((state) => {
        return state.sukien.danhSachSuKien
    })

    useEffect(() => {
        dispatch(truyvanDanhSachSuKien())
    }, [])

    return (
        <section
            className="ftco-section ftco-event img"
            style={{ backgroundImage: 'url(images/bg_1.jpg)' }}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-7 text-center heading-section heading-section-white">
                        <h5 className="text-white">
                            Chương trình sự kiện nổi bật
                        </h5>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="event-slider">
                            {items && (
                                <Slider
                                    {...{
                                        dots: false,
                                        prevArrow: false,
                                        nextArrow: false,
                                        infinite: true,
                                        speed: 500,
                                        slidesToShow: 1,
                                        slidesToScroll: 1,
                                        autoplay: true,
                                        autoplaySpeed: 10000,
                                    }}
                                >
                                    {items.map((el, idx) => {
                                        return (
                                            <EventIntroItem
                                                title={el.title}
                                                place={el.address}
                                                content={el.content}
                                                image={`${BASE_URL}/upload/${el.imageUrl}`}
                                                key={el.id}
                                            />
                                        )
                                    })}
                                    {/* {DUMMY_DATA.map((el, idx) => {
                  return (
                    <EventIntroItem
                      title={el.title}
                      place={el.address}
                      content={el.content}
                      image={`${el.image}`}
                      key={el.id}
                    />
                  );
                })} */}
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventIntro
