import React, { Fragment, useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'
import MainFooter from '../components/common/MainFooter'
import MainHeader from '../components/MainHeader'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import ServiceDetail from 'components/dichvu/ServiceDetail'

const BASE_URL = process.env.REACT_APP_URL

const ServiceDetailPage = (props) => {
    const params = useParams()
    const { id } = params
    const [detailData, setDetailData] = useState(null)
    const [errMessage, setErrMessage] = useState('')

    useEffect(() => {
        if (id) {
            fetch(`${BASE_URL}/api/dichvu/chitietdichvu/${id}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Không tìm thấy dữ liệu')
                    }
                    return res.json()
                })
                .then((data) => {
                    setDetailData(data)
                })
                .catch((err) => {
                    setErrMessage(err.message)
                })
        }
    }, [id])

    return (
        <Fragment>
            <MainHeader />
            {detailData && <ServiceDetail detailData={detailData} />}
            <MainFooter />
        </Fragment>
    )
}

export default ServiceDetailPage
