import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainFooter from '../components/common/MainFooter'
import MainHeader from '../components/MainHeader'
import DestinationDetailItem from '../components/diemden/DestinationDetailItem'
import { useDispatch, useSelector } from 'react-redux'
import { truyvanChiTietDiaDiem } from '../store/diadiem-actions'

import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const DestinationDetailPage = (props) => {
    const params = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const placeId = params.placeId

    const placeInfo = useSelector((state) => {
        return state.diadiem.chitietDiaDiem
    })

    useEffect(() => {
        dispatch(truyvanChiTietDiaDiem(placeId))
    }, [placeId])

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
            {placeInfo && <DestinationDetailItem detailData={placeInfo} />}
            {/* {placeInfo && <h3>hihihehe</h3>} */}
            <MainFooter />
        </Fragment>
    )
}

export default DestinationDetailPage
