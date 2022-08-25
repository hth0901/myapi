import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { useParams } from 'react-router-dom'

import classes from './TicketDetailPage.module.css'

const API_URL = process.env.REACT_APP_URL

const TicketDetailPage = (props) => {
    const { arrCustomerType } = useSelector((state) => state.common)

    const params = useParams()
    const orderId = params.orderId
    const cusType = params.cusType

    const curCustomerType = arrCustomerType.find((el) => el.id === +cusType)

    const [ticketObj, setTicketObj] = useState(null)

    const arrTicketDetails = [
        ...((ticketObj && ticketObj.ticketPlaceDetails) || []),
    ]
    const arrTicketDetailsResult = []
    const setPlaces = new Set(arrTicketDetails.map((el) => el.placeId))
    setPlaces.forEach((el) => {
        const detailObj = {
            placeId: el,
            placeName: '',
            items: [],
            itemsRemain: [],
        }

        arrTicketDetails.forEach((dtItem) => {
            if (dtItem.placeId === detailObj.placeId) {
                detailObj.placeName = dtItem.placeName
                detailObj.items.push(
                    `${dtItem.quantity} ${dtItem.customerTypeName}`
                )
                detailObj.itemsRemain.push(
                    `${dtItem.quantityRemain} ${dtItem.customerTypeName}`
                )
            }
        })

        arrTicketDetailsResult.push(detailObj)
    })
    // console.log(arrTicketDetailsResult);

    useEffect(() => {
        const ticketResult = async () => {
            const response = await fetch(`${API_URL}/api/Pay/ticket/${orderId}`)
            if (!response.ok) {
                const errorMessage = await response.text()
                throw new Error(errorMessage)
            }

            const data = await response.json()
            setTicketObj(data)
            // return data;
        }
        ticketResult()
    }, [])

    return (
        <Fragment>
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar no-fix"
                style={{
                    backgroundColor: `${
                        (curCustomerType &&
                            curCustomerType.colorCode &&
                            curCustomerType.colorCode) ||
                        '#fd813c'
                    }`,
                }}
            >
                <div className="overlay-blur"></div>
                <div
                    className="container-fluid"
                    style={{
                        height: '60px',
                    }}
                >
                    <a className="navbar-brand" href="index.html">
                        <img src="/images/logo.svg" alt="img-fluid" />
                    </a>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <p
                        className={classes['big-header']}
                        style={{
                            color: `${
                                (curCustomerType &&
                                    curCustomerType.colorCode &&
                                    curCustomerType.colorCode) ||
                                '#fd813c'
                            }`,
                        }}
                    >
                        Vé điện tử thông tin tham quan
                    </p>
                </div>
                <div
                    className="row"
                    style={{
                        background: `${
                            (curCustomerType &&
                                curCustomerType.colorCode &&
                                curCustomerType.colorCode) ||
                            '#fd813c'
                        }`,
                    }}
                >
                    <p className={classes['p-header']}>
                        1. Thông tin vé tham quan
                    </p>
                </div>
                <div className={`row ${classes['div-place-info']}`}>
                    {arrTicketDetailsResult.map((el, idx) => {
                        return (
                            <div
                                key={idx}
                                className={classes['div-place-info-item']}
                            >
                                <div className={classes['div-info-detail']}>
                                    <p className={classes['info-detail']}>
                                        Địa điểm tham quan:
                                    </p>
                                    <p
                                        className={`${classes['info-detail']} ${classes['info-detail-value']}`}
                                    >
                                        {el.placeName}
                                    </p>
                                </div>
                                <div className={classes['div-info-detail']}>
                                    <p className={classes['info-detail']}>
                                        Số lượng:
                                    </p>
                                    <p
                                        className={`${classes['info-detail']} ${classes['info-detail-value']}`}
                                    >
                                        {el.items.join(', ')}
                                    </p>
                                </div>
                                <div className={classes['div-info-detail']}>
                                    <p className={classes['info-detail']}>
                                        Số lượt còn lại
                                    </p>
                                    <p
                                        className={`${classes['info-detail']} ${classes['info-detail-value']}`}
                                    >
                                        {el.itemsRemain.join(', ')}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div
                    className="row"
                    style={{
                        background: `${
                            (curCustomerType &&
                                curCustomerType.colorCode &&
                                curCustomerType.colorCode) ||
                            '#fd813c'
                        }`,
                        marginTop: '10px',
                    }}
                >
                    <p className={classes['p-header']}>2. Thông tin cá nhân</p>
                </div>
                <div className={`row ${classes['div-person-info']}`}>
                    <div
                        className={`col-12 ${classes['div-person-info-detail']}`}
                    >
                        <p className={classes['p-person-info-header']}>
                            Họ và tên
                        </p>
                        <p className={classes['p-person-info-header']}>
                            Số điện thoại
                        </p>
                        <p className={classes['p-person-info-header']}>Email</p>
                        <p className={classes['p-person-info-header']}>
                            CMND/CCCD
                        </p>
                    </div>
                    <div
                        className={`col-12 ${classes['div-person-info-detail']}`}
                    >
                        <p className={classes['p-person-info-detail']}>
                            {(ticketObj && ticketObj.fullName) ||
                                'Khách tham quan'}
                        </p>
                        <p className={classes['p-person-info-detail']}>
                            {(ticketObj && ticketObj.phoneNumber) || ''}
                        </p>
                        <p className={classes['p-person-info-detail']}>
                            {(ticketObj && ticketObj.email) || ''}
                        </p>
                        <p className={classes['p-person-info-detail']}>
                            {(ticketObj && ticketObj.uniqId) || ''}
                        </p>
                    </div>
                </div>
                <div
                    className="row"
                    style={{
                        background: `${
                            (curCustomerType &&
                                curCustomerType.colorCode &&
                                curCustomerType.colorCode) ||
                            '#fd813c'
                        }`,
                        marginTop: '10px',
                    }}
                >
                    <p className={classes['p-header']}>
                        3. Chi tiết thanh toán
                    </p>
                </div>
                <div className={`row ${classes['div-payment-info']}`}>
                    <p
                        className={classes['payment-detail']}
                        style={{
                            color: `${
                                (curCustomerType &&
                                    curCustomerType.colorCode &&
                                    curCustomerType.colorCode) ||
                                '#fd813c'
                            }`,
                        }}
                    >
                        Tổng cộng
                    </p>
                    <p
                        className={classes['payment-detail']}
                        style={{
                            color: `${
                                (curCustomerType &&
                                    curCustomerType.colorCode &&
                                    curCustomerType.colorCode) ||
                                '#fd813c'
                            }`,
                        }}
                    >
                        {(ticketObj && ticketObj.totalPrice) || 0} VNĐ
                    </p>
                </div>
            </div>
        </Fragment>
    )
}

export default TicketDetailPage
