import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useParams, Navigate, useLocation } from 'react-router-dom'

const API_URL = process.env.REACT_APP_URL
const BASE_URL = process.env.REACT_APP_URL

const TrangThongTinVe = (props) => {
    const params = useParams()
    const orderId = params.orderId

    const [ticketObj, setTicketObj] = useState(null)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

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
        }

        arrTicketDetails.forEach((dtItem) => {
            if (dtItem.placeId === detailObj.placeId) {
                detailObj.placeName = dtItem.placeName
                detailObj.items.push(
                    `${dtItem.quantity} ${dtItem.customerTypeName}`
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
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar no-fix"
                style={{
                    backgroundColor: '#fd813c',
                }}
            >
                <div className="overlay-blur"></div>
                <div
                    className="container-fluid"
                    style={{
                        height: '60px',
                    }}
                >
                    {/* <a className="navbar-brand" href="index.html">
                        <img src="/images/logo.svg" alt="img-fluid" />
                    </a> */}
                    <Link className="navbar-brand" to={'/home-page'}>
                        <img src="/images/logo.svg" alt="img-fluid" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ftco-nav"
                        aria-controls="ftco-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span> Menu
                    </button>
                </div>
            </nav>
            <div>
                <table style={{ margin: 'auto', marginTop: '20px' }}>
                    <tbody>
                        <tr>
                            <td>
                                <table
                                    id="content-email"
                                    bgcolor="#fff"
                                    width="800"
                                    border="0"
                                    align="center"
                                    cellPadding={'0'}
                                    cellSpacing={'0'}
                                >
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h4
                                                    style={{
                                                        fontSize: '28px',
                                                        lineHeight: '40px',
                                                        color: '#f94527',
                                                        fontWeight: '700',
                                                    }}
                                                >
                                                    VÉ ĐIỆN TỬ THÔNG TIN THAM
                                                    QUAN
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table
                                                    width="100%"
                                                    border="0"
                                                    align="left"
                                                    cellPadding={'10'}
                                                    cellSpacing={'0'}
                                                >
                                                    <colgroup>
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr
                                                            style={{
                                                                backgroundColor:
                                                                    '#f94527',
                                                                textAlign:
                                                                    'left',
                                                                fontSize:
                                                                    '20px',
                                                            }}
                                                        >
                                                            <th
                                                                colSpan="4"
                                                                style={{
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                1. THÔNG TIN VÉ
                                                                THAM QUAN
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {arrTicketDetailsResult.map(
                                                            (el) => {
                                                                return (
                                                                    <tr
                                                                        style={{
                                                                            fontSize:
                                                                                '16px',
                                                                        }}
                                                                    >
                                                                        <td>
                                                                            <p>
                                                                                Địa
                                                                                điểm
                                                                                tham
                                                                                quan:
                                                                            </p>
                                                                            <p>
                                                                                Số
                                                                                lượng:
                                                                            </p>
                                                                        </td>
                                                                        <td colSpan="2">
                                                                            <p
                                                                                style={{
                                                                                    fontWeight:
                                                                                        'bold',
                                                                                }}
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        el.placeName
                                                                                    }
                                                                                </strong>
                                                                            </p>
                                                                            <p
                                                                                style={{
                                                                                    fontWeight:
                                                                                        'bold',
                                                                                }}
                                                                            >
                                                                                <strong>
                                                                                    {el.items.join(
                                                                                        ', '
                                                                                    )}
                                                                                </strong>
                                                                            </p>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        )}
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table
                                                    width="100%"
                                                    border="0"
                                                    align="left"
                                                    cellPadding={'10'}
                                                    cellSpacing={'0'}
                                                >
                                                    <colgroup>
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr
                                                            style={{
                                                                backgroundColor:
                                                                    '#f94527',
                                                                textAlign:
                                                                    'left',
                                                                fontSize:
                                                                    '20px',
                                                            }}
                                                        >
                                                            <th
                                                                colSpan="4"
                                                                style={{
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                2. THÔNG TIN CÁ
                                                                NHÂN
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '20px',
                                                                }}
                                                            >
                                                                Họ và tên
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '20px',
                                                                }}
                                                            >
                                                                Số điện thoại
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '20px',
                                                                }}
                                                            >
                                                                Email
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '20px',
                                                                }}
                                                            >
                                                                CMND/CCCD
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '0',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {(ticketObj &&
                                                                        ticketObj.fullName) ||
                                                                        ''}
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '0',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {(ticketObj &&
                                                                        ticketObj.phoneNumber) ||
                                                                        ''}
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '0',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {(ticketObj &&
                                                                        ticketObj.email) ||
                                                                        ''}
                                                                </strong>
                                                            </td>
                                                            <td
                                                                style={{
                                                                    paddingTop:
                                                                        '0',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    {(ticketObj &&
                                                                        ticketObj.uniqId) ||
                                                                        ''}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table
                                                    width="100%"
                                                    border="0"
                                                    align="left"
                                                    cellPadding={'10'}
                                                    cellSpacing={'0'}
                                                >
                                                    <colgroup>
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                        <col width="25%" />
                                                    </colgroup>
                                                    <thead>
                                                        <tr
                                                            style={{
                                                                backgroundColor:
                                                                    '#f94527',
                                                                textAlign:
                                                                    'left',
                                                                fontSize:
                                                                    '20px',
                                                            }}
                                                        >
                                                            <th
                                                                colSpan="4"
                                                                style={{
                                                                    color: '#fff',
                                                                }}
                                                            >
                                                                3. CHI TIẾT
                                                                THANH TOÁN
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td
                                                                colSpan="2"
                                                                style={{
                                                                    borderTop:
                                                                        '1px solid #e6e6e6',
                                                                    borderBottom:
                                                                        '1px solid #e6e6e6',
                                                                    paddingTop:
                                                                        '20px',
                                                                    paddingBottom:
                                                                        '20px',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        color: '#f94527',
                                                                        fontWeight:
                                                                            'bold',
                                                                    }}
                                                                >
                                                                    Tổng cộng
                                                                </strong>
                                                            </td>
                                                            <td
                                                                colSpan="2"
                                                                align="right"
                                                                style={{
                                                                    borderTop:
                                                                        '1px solid #e6e6e6',
                                                                    borderBottom:
                                                                        '1px solid #e6e6e6',
                                                                    paddingTop:
                                                                        '20px',
                                                                    paddingBottom:
                                                                        '20px',
                                                                }}
                                                            >
                                                                <strong
                                                                    style={{
                                                                        fontSize:
                                                                            '18px',
                                                                        color: '#f94527',
                                                                    }}
                                                                >
                                                                    {(ticketObj &&
                                                                        ticketObj.totalPrice) ||
                                                                        0}{' '}
                                                                    VNĐ
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colSpan="2">
                                                                Phương thức
                                                                thanh toán
                                                                <br />
                                                            </td>
                                                            <td
                                                                colSpan="2"
                                                                align="right"
                                                            >
                                                                <strong>
                                                                    Chuyển khoản
                                                                    ngân hàng
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td
                                                                colSpan="4"
                                                                style={{
                                                                    paddingTop:
                                                                        '20px',
                                                                    paddingBottom:
                                                                        '100px',
                                                                }}
                                                            >
                                                                <i>
                                                                    (*) Quý
                                                                    khách vui
                                                                    lòng giữ lại
                                                                    vé này để
                                                                    dùng khi đến
                                                                    tham quan
                                                                </i>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default TrangThongTinVe
