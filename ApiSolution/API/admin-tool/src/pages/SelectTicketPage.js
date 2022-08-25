import React, { Fragment, useEffect, useState } from 'react'
import TicketItem from '../components/chonve/TicketItem'
import AOS from 'aos'

import { truyVanDanhSachDiaDiemGiaVe } from '../store/diadiem-actions'
import { useSelector, useDispatch } from 'react-redux'

import MainHeader from '../components/MainHeader'

import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const SelectTicketPage = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    const { danhsachDiaDiemGiaVe: danhsachDiaDiem } = useSelector(
        (state) => state.diadiem
    )
    useEffect(() => {
        AOS.init({
            duration: 1500,
        })
    }, [])

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiemGiaVe())
    }, [])

    useEffect(() => {
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        const curRoleId = (curUser && curUser.roleid) || -1
        fetch(
            `${BASE_URL}/api/menu/getclientautho/${encodeURIComponent(
                location.pathname
            )}`
        )
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                if (data.length > 0 && !data.includes(curRoleId)) {
                    setIsAuthen(false)
                }
            })
            .catch((err) => {
                // setIsAuthenticated(false)
                setIsAuthen(false)
            })
    }, [isAuthen])
    if (!isAuthen) {
        return (
            <Navigate
                to={{
                    pathname: '/home-page',
                }}
            />
        )
    }
    return (
        <Fragment>
            <MainHeader />
            <div className="hero-wrap layout-page">
                <div className="home-slider">
                    <div href="#" className="item">
                        {/* <div className="overlay"></div> */}
                        <div
                            className="img__bg"
                            style={{
                                backgroundImage: 'url(images/DaiNoi.jpg)',
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>Chọn vé</h1>
                                    <ul className="slider-step">
                                        <li className="active body-1">
                                            <span>01</span> Chọn vé
                                        </li>
                                        <li className="body-1">
                                            <span>02</span> Mua vé
                                        </li>
                                        <li className="body-1">
                                            <span>03</span> Thanh toán
                                        </li>
                                        <li className="body-1">
                                            <span>04</span> Cám ơn
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-destination ftco-order">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-12 search-section mb-40"
                            data-aos="fade-up"
                        >
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Điểm đến..."
                                    aria-label="Điểm đến..."
                                    aria-describedby="searchdestination"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        id="searchdestination"
                                    >
                                        <i className="material-icons-outlined">
                                            search
                                        </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {danhsachDiaDiem.map((el, idx) => {
                            return (
                                <TicketItem
                                    key={el.id}
                                    title={el.title}
                                    price={el.adultPrice}
                                    image={`${BASE_URL}/upload/${el.imageUrl}`}
                                    placeDetail={el}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SelectTicketPage
