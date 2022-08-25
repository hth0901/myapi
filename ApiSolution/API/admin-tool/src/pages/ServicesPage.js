import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'

import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import BannerSlider from '../components/common/BannerSlider'

const BASE_URL = process.env.REACT_APP_URL

const ServicesPage = (props) => {
    const [danhsachDichVu, setDanhsachDichVu] = useState([])

    useEffect(() => {
        AOS.init({
            duration: 1500,
        })
        fetch(`${BASE_URL}/api/DichVu/danhsachdichvu`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setDanhsachDichVu(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Fragment>
            <MainHeader />
            <BannerSlider />
            <section className="ftco-section ftco-destination">
                <div className="container">
                    <div className="row">
                        {danhsachDichVu.map((el, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="col-md-4 box-scroll"
                                    data-aos="fade-up"
                                    data-aos-offset="150"
                                >
                                    <Link
                                        to={`/dich-vu/${el.id}`}
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
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default ServicesPage
