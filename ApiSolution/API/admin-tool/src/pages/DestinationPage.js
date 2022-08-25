import React, { Fragment, useEffect, useState } from 'react'
import DestinationItem from '../components/diemden/DestinationItem'
import AOS from 'aos'
import BannerSlider from '../components/common/BannerSlider'
import { useDispatch, useSelector } from 'react-redux'
import { truyVanDanhSachDiaDiem } from '../store/diadiem-actions'
import MainFooter from '../components/common/MainFooter'
import MainHeader from '../components/MainHeader'
import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const DestinationPage = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    useEffect(() => {
        AOS.init({
            duration: 1500,
        })

        dispatch(truyVanDanhSachDiaDiem())
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

    const { danhsach: danhsachDiaDiem } = useSelector((state) => state.diadiem)

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
            <BannerSlider />
            <section className="ftco-section ftco-destination">
                <div className="container">
                    <div className="row">
                        <div className="col-12 search-section mb-40">
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
                                <DestinationItem
                                    id={el.id}
                                    key={idx}
                                    title={el.title}
                                    content={el.description}
                                    image={`${BASE_URL}/upload/${el.imageUrl}`}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
        // <div className="hero-wrap homepage js-fullheight">
        //   <BannerSlider />

        // </div>
    )
}

export default DestinationPage
