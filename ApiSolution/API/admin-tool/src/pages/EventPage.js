import React, { Fragment, useEffect, useState } from 'react'
import AOS from 'aos'
import EventItem from '../components/sukien/EventItem'
import BannerSlider from '../components/common/BannerSlider'
import { useDispatch, useSelector } from 'react-redux'
import { truyvanDanhSachSuKien } from '../store/sukien-action'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const EventPage = (props) => {
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    useEffect(() => {
        AOS.init({
            duration: 1500,
        })

        dispatch(truyvanDanhSachSuKien())
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

    const { danhSachSuKien } = useSelector((state) => state.sukien)

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
                        {danhSachSuKien.map((el, idx) => {
                            return (
                                <EventItem
                                    id={el.id}
                                    title={el.title}
                                    subtitle={el.address}
                                    content={el.content}
                                    image={`${BASE_URL}/upload/${el.imageUrl}`}
                                    key={el.id}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
    )
}

export default EventPage
