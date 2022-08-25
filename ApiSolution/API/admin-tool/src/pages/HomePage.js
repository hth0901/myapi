import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MainHeader from '../components/MainHeader'
import BannerSliderHome from '../components/trangchu/BannerSliderHome'
import QuickOrder from '../components/trangchu/QuickOrder'
import { authActions } from 'store/auth-slice'
import jwtDecode from 'jwt-decode'

const HomePage = (props) => {
    // const dispatch = useDispatch()
    // const { isAuthenticated, isInitialised } = useSelector((state) => {
    //     return state.auth
    // })

    // let authenticated = isAuthenticated

    // useEffect(() => {
    //     if (isInitialised) return
    //     const curToken = localStorage.getItem('token')
    //     const curStrUser = localStorage.getItem('user')
    //     const curUser = JSON.parse(curStrUser)
    //     if (!curToken) return
    //     const decodedToken = jwtDecode(curToken)
    //     const currentTime = Date.now() / 1000
    //     if (decodedToken <= currentTime) return
    //     dispatch(
    //         authActions.autoLogin({
    //             curUser: curUser,
    //             token: curToken,
    //         })
    //     )
    // }, [isInitialised])
    return (
        <Fragment>
            <MainHeader />
            <div>
                <div className="hero-wrap homepage js-fullheight">
                    <BannerSliderHome />
                    <QuickOrder />
                </div>
            </div>
        </Fragment>
    )
}

export default HomePage
