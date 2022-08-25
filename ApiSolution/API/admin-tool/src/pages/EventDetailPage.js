import MainFooter from 'components/common/MainFooter'
import MainHeader from 'components/MainHeader'
import React, { useEffect, Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import EventDetail from 'components/sukien/EventDetail'

import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const EventDetailPage = (props) => {
    const params = useParams()
    const { eventId } = params

    const [detailData, setDetailData] = useState(null)
    const [errMessage, setErrMessage] = useState('')
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

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

    useEffect(() => {
        if (eventId) {
            fetch(`${BASE_URL}/api/SuKien/${eventId}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Không tìm thấy dữ liệu của sự kiện')
                    }
                    return res.json()
                })
                .then((data) => {
                    // console.log(data)
                    setDetailData(data)
                })
                .catch((err) => {
                    // console.log(err)
                    setErrMessage(err.message)
                })
        }
    }, [eventId])

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
            {detailData && <EventDetail detailData={detailData} />}
            <MainFooter />
        </Fragment>
    )
}

export default EventDetailPage
