import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import DestinationIntro from '../components/khampha/DestinationIntro'
import EventIntro from '../components/khampha/EventIntro'
import ServicesIntro from '../components/khampha/ServicesIntro'
import AOS from 'aos'
import BannerSlider from '../components/common/BannerSlider'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'

import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const KhamPha = (props) => {
    const location = useLocation()
    const [isAuthen, setIsAuthen] = useState(true)
    useEffect(() => {
        AOS.init({
            duration: 1500,
        })
    }, [])

    useEffect(() => {
        const curStrUser = localStorage.getItem('user')
        const curUser = JSON.parse(curStrUser)
        const curRoleId = (curUser && curUser.roleid) || -1
        console.log(location.pathname)
        console.log(curUser)
        console.log(curRoleId)
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
            {/* <HomeSlider /> */}
            {/* <TestSlider /> */}
            <MainHeader />
            <div>
                <BannerSlider />
                <DestinationIntro />
                <EventIntro />
                <ServicesIntro />
                <MainFooter />
            </div>
        </Fragment>
    )
}

export default KhamPha
