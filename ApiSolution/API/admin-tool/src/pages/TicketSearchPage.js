import React, { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const API_URL = process.env.REACT_APP_URL

const TicketSearchPage = (props) => {
    const inputRef = useRef()
    const [ticketObj, setTicketObj] = useState(null)
    const [errorMessage, setErrorMessage] = useState('')
    const submitHandler = (evt) => {
        evt.preventDefault()
        const inputTicketId = inputRef.current.value
        const ticketResult = async () => {
            const response = await fetch(
                `${API_URL}/api/Pay/ticket/${inputTicketId}`
            )
            if (response.ok) {
                const data = await response.json()
                setTicketObj(data)
            } else {
                const mes = await response.text()
                setErrorMessage(mes)
                setTicketObj(null)
            }
            // return data;
        }
        try {
            ticketResult()
        } catch (err) {
            // console.log(err)
        }
    }

    let returnResult = <p style={{ textAlign: 'center' }}>Hãy nhập mã vé</p>

    if (errorMessage) {
        returnResult = (
            <p style={{ textAlign: 'center' }}>Không tồn tại đơn hàng</p>
        )
    }

    if (ticketObj) {
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
        returnResult = (
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
                                                VÉ ĐIỆN TỬ THÔNG TIN THAM QUAN
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
                                                            textAlign: 'left',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <th
                                                            colSpan="4"
                                                            style={{
                                                                color: '#fff',
                                                            }}
                                                        >
                                                            1. THÔNG TIN VÉ THAM
                                                            QUAN
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {arrTicketDetailsResult.map(
                                                        (el, idx) => {
                                                            return (
                                                                <tr
                                                                    key={idx}
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
                                                                        <p>
                                                                            Số
                                                                            lượt
                                                                            còn
                                                                            lại:
                                                                        </p>
                                                                    </td>
                                                                    <td colSpan="3">
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
                                                                        <p
                                                                            style={{
                                                                                fontWeight:
                                                                                    'bold',
                                                                            }}
                                                                        >
                                                                            <strong>
                                                                                {el.itemsRemain.join(
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
                                                            textAlign: 'left',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <th
                                                            colSpan="4"
                                                            style={{
                                                                color: '#fff',
                                                            }}
                                                        >
                                                            2. THÔNG TIN CÁ NHÂN
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
                                                                paddingTop: '0',
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
                                                                paddingTop: '0',
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
                                                                paddingTop: '0',
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
                                                                paddingTop: '0',
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
                                                            textAlign: 'left',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <th
                                                            colSpan="4"
                                                            style={{
                                                                color: '#fff',
                                                            }}
                                                        >
                                                            3. CHI TIẾT THANH
                                                            TOÁN
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
                                                            Phương thức thanh
                                                            toán
                                                            <br />
                                                        </td>
                                                        <td
                                                            colSpan="2"
                                                            align="right"
                                                        >
                                                            <strong>
                                                                Tại quầy
                                                            </strong>
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
        )
    }

    return (
        <Fragment>
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar no-fix"
                style={{
                    backgroundColor: '#f94527',
                }}
            >
                <div className="overlay-blur"></div>
                <div
                    className="container-fluid"
                    style={{
                        height: '60px',
                    }}
                >
                    <Link className="navbar-brand" to={'/home-page'}>
                        <img src="/images/logo.svg" alt="img-fluid" />
                    </Link>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <h5>
                        Vui lòng nhập mã vé được in trên vé để tra cứu thông tin
                        vé
                    </h5>
                </div>
                <div className="row" style={{ justifyContent: 'center' }}>
                    <div className="col-6">
                        <form
                            style={{ width: '100%' }}
                            onSubmit={submitHandler}
                        >
                            <div className="form-group">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Tra cứu
                            </button>
                        </form>
                    </div>
                </div>
                <div className="row">{returnResult}</div>
            </div>
        </Fragment>
    )
}

export default TicketSearchPage
