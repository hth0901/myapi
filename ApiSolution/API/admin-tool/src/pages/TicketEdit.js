import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams, Navigate, useLocation } from 'react-router-dom'

import DataGrid, {
    Column,
    Paging,
    Pager,
    Button,
    Editing,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { createStore } from 'devextreme-aspnet-data-nojquery'
import { SimpleCard } from 'app/components'
import TicketEditItem from './TicketEditItem'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const TicketEdit = (props) => {
    const params = useParams()
    const orderId = params.orderId

    const [ticketObj, setTicketObj] = useState(null)
    const [orderInfo, setOrderInfo] = useState(null)
    const [arrDetails, setArrDetails] = useState([])
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    useEffect(() => {
        // const ticketResult = async () => {
        //     const response = await fetch(`${API_URL}/api/Pay/ticket/${orderId}`)
        //     if (!response.ok) {
        //         const errorMessage = await response.text()
        //         throw new Error(errorMessage)
        //     }
        //     const data = await response.json()
        //     setTicketObj(data)
        //     // return data;
        // }
        // ticketResult()

        fetch(`${API_URL}/api/ticket/orderinfo/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setOrderInfo(data)
            })
            .catch((err) => {
                console.log(err)
            })

        fetch(`${API_URL}/api/pay/ticketdetail/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                const setOfPlace = new Set(
                    data.map((el) => {
                        return el.ticketTypeId
                    })
                )
                const arrData = []
                setOfPlace.forEach((el) => {
                    const detailObj = {
                        placeId: el,
                        placeName: '',
                        items: [],
                        isUsed: 0,
                    }

                    data.forEach((dt) => {
                        if (dt.ticketTypeId === detailObj.placeId) {
                            detailObj.placeName = dt.placeName
                            detailObj.items.push({ ...dt })
                            detailObj.isUsed = +dt.isUsed
                        }
                    })

                    arrData.push(detailObj)
                })
                // console.log(arrData)
                setArrDetails(arrData)
            })
            .catch((err) => {
                console.log(err)
            })
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

    const reGetData = () => {
        fetch(`${API_URL}/api/pay/ticketdetail/${orderId}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                const setOfPlace = new Set(
                    data.map((el) => {
                        return el.placeId
                    })
                )
                const arrData = []
                setOfPlace.forEach((el) => {
                    const detailObj = {
                        placeId: el,
                        placeName: '',
                        items: [],
                    }

                    data.forEach((dt) => {
                        if (dt.placeId === detailObj.placeId) {
                            detailObj.placeName = dt.placeName
                            detailObj.items.push({ ...dt })
                        }
                    })

                    arrData.push(detailObj)
                })
                setArrDetails(arrData)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const onRowUpdating = (evt) => {
        console.log(evt)
        evt.component.cancelEditData()
    }

    const onRowUpdated = (evt) => {}

    const onSaving = (evt) => {}

    const onSaved = (evt) => {}

    const dataSource = createStore({
        key: 'id',
        loadUrl: `${API_URL}/api/pay/ticketdetail/${orderId}`,
        updateUrl: `${API_URL}/api/ticket/updatedetail`,
        onBeforeSend: (method, ajaxOptions) => {
            ajaxOptions.xhrFields = { withCredentials: false }
        },
    })

    const updateHandler = (evt) => {
        console.log(evt)
    }

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
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <dl className="row">
                            <dd className="col-md-3 col-6">Họ và tên:</dd>
                            <dt className="col-md-9 col-6">
                                {(orderInfo && orderInfo.fullName) || ''}
                            </dt>

                            <dd className="col-md-3 col-6">Số điện thoại:</dd>
                            <dt className="col-md-9 col-6">
                                {(orderInfo && orderInfo.phoneNumber) || ''}
                            </dt>

                            <dd className="col-md-3 col-6">Email:</dd>
                            <dt className="col-md-9 col-6">
                                {(orderInfo && orderInfo.email) || ''}
                            </dt>
                        </dl>
                    </div>
                </div>
                <div
                    className="row"
                    style={{ justifyContent: 'flex-start', gap: '10px' }}
                >
                    {arrDetails.map((el, idx) => {
                        return (
                            <TicketEditItem
                                key={idx}
                                onRefresh={reGetData}
                                data={el}
                            />
                        )
                    })}
                </div>
            </div>
        </Fragment>
    )
}

export default TicketEdit

{
    /* <DataGrid
                            dataSource={dataSource}
                            showBorders={true}
                            onRowUpdating={onRowUpdating}
                            onRowUpdated={onRowUpdated}
                            onSaving={onSaving}
                            onSaved={onSaved}
                        >
                            <Editing
                                mode={'row'}
                                allowUpdating={true}
                                allowDeleting={false}
                                allowAdding={false}
                            />
                            <Column
                                dataField={'placeName'}
                                caption="Địa điểm"
                                allowEditing={false}
                            />
                            <Column
                                dataField={'customerTypeName'}
                                caption="Đối tượng"
                                allowEditing={false}
                            />
                            <Column
                                dataField={'quantity'}
                                caption="Số lượng"
                                width={200}
                                allowEditing={true}
                            />
                            <Column
                                dataField={'quantityRemain'}
                                caption="Lượt còn lại"
                                width={200}
                                allowEditing={false}
                            />
                        </DataGrid> */
}
