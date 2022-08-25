import React, { useEffect } from 'react'
import DestinationIntroItem from './DestinationIntroItem'

import Slider from 'react-slick'

import { useDispatch, useSelector } from 'react-redux'
import { diadiemActions } from '../../store/diadiem-slice'

import { truyVanDanhSachDiaDiem } from '../../store/diadiem-actions'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const BASE_URL = process.env.REACT_APP_URL

const DUMMY_DATA = [
    {
        title: 'Hoàng Cung',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/DaiNoi.jpg',
    },
    {
        title: 'Lăng Tự Đức',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/TuDuc.jpg',
    },
    {
        title: 'Lăng Minh Mạng',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/MinhMang.jpg',
    },
    {
        title: 'Hoàng Cung',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/DaiNoi.jpg',
    },
    {
        title: 'Lăng Tự Đức',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/TuDuc.jpg',
    },
    {
        title: 'Lăng Minh Mạng',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/MinhMang.jpg',
    },
    {
        title: 'Hoàng Cung',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/DaiNoi.jpg',
    },
    {
        title: 'Lăng Tự Đức',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/TuDuc.jpg',
    },
    {
        title: 'Lăng Minh Mạng',
        description:
            'Được công nhận là Di sản Văn hoá Thế giới UNESCO từ năm 1993',
        image: 'images/MinhMang.jpg',
    },
]

const DestinationIntro = (props) => {
    const dispatch = useDispatch()

    const dsDiaDiem = useSelector((state) => {
        return state.diadiem.danhsach
    })

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiem())
    }, [])

    const sliderConfig = {
        dots: false,
        infinite: true,
        speed: 500,
        // slidesToShow: 1,
        // slidesToScroll: 1,
        slidesToShow: 3,
        slidesToScroll: 3,
        // nextArrow: <span className="material-icons-outlined">west</span>,
        // prevArrow: <span className="material-icons-outlined">east</span>,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
        ],
    }
    return (
        <section className="ftco-section ftco-destination">
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-md-7 heading-section">
                        <h5 className="mb-60">Khám phá di sản Huế</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="destination-slider">
                            {dsDiaDiem && (
                                <Slider {...sliderConfig}>
                                    {dsDiaDiem.map((el, idx) => {
                                        return (
                                            <DestinationIntroItem
                                                key={el.id}
                                                title={el.title}
                                                content={el.content}
                                                description={el.description}
                                                image={`${BASE_URL}/upload/${el.imageUrl}`}
                                                id={el.id}
                                            />
                                        )
                                    })}
                                </Slider>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DestinationIntro
