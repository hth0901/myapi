import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import publicIp from "public-ip";
import dateFormat from 'dateformat'
import querystring from 'qs'
import crypto from 'crypto'

import { createOrderTemp } from '../store/order-actions'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { getTicketDetail, getTicketId } from '../store/order-actions'

const API_URL = process.env.REACT_APP_URL
const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const sortObject = (obj) => {
    var sorted = {}
    var str = []
    var key
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key))
        }
    }
    str.sort()
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        )
    }
    return sorted
}

const PaymentQuickOrderPage = (props) => {
    const tk = localStorage.getItem('token')
    const dispatch = useDispatch()
    const history = useNavigate()
    const location = useLocation()
    const [isAuthen, setIsAuthen] = useState(true)
    const customerInfo = useSelector((state) => state.order.customerInfo)
    const selectedPlace = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { details, totalPrice } = selectedPlace
    const mOrderId = useSelector((state) => state.order.orderId)
    // const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));
    const loginInfo = useSelector((state) => state.authen.userInfo)
    const ticketObj = useSelector((state) => state.order.orderInfo)
    // const ticketId = useSelector(state => state.order.ticketId);
    // console.log(loginInfo);
    // console.log(loginInfo);

    useEffect(() => {
        if (ticketObj) {
            console.log(ticketObj)
            history('/return-ticket')
        }
    }, [ticketObj])
    // useEffect(() => {
    //   if (ticketId) {
    //     history.push("/return-ticket");
    //   }
    // }, [ticketId])

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
        if (!mOrderId) return
        /*
    const redirectVnpay = async () => {
      
      const myIP = await publicIp.v4();
      const { vnp_TmnCode, vnp_HashSecret, vnp_ReturnUrl, vnp_Url } =
        configData;
      const date = new Date();
      const createdDate = dateFormat(date, "yyyymmddHHmmss");
      // const orderId = dateFormat(date, "HHmmss");

      const vnp_params = {
        vnp_Version: "2.1.0",
        vnp_Command: "pay",
        vnp_TmnCode: vnp_TmnCode,
        vnp_Locale: "vn",
        vnp_CurrCode: "VND",
        vnp_TxnRef: mOrderId,
        vnp_OrderInfo: "pay eticket",
        vnp_OrderType: "billpayment",
        vnp_Amount: +totalPrice * 100,
        vnp_ReturnUrl: vnp_ReturnUrl,
        vnp_IpAddr: myIP,
        vnp_CreateDate: createdDate,
        vnp_BankCode: "NCB",
      };
      const params = sortObject(vnp_params);
      const signData = querystring.stringify(params, { encode: false });
      const hmac = crypto.createHmac("sha512", vnp_HashSecret);
      const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      params["vnp_SecureHash"] = signed;
      const directUrl = `${vnp_Url}?${querystring.stringify(params, {
        encode: false,
      })}`;
      window.location.href = directUrl;
    };

    if (!loginInfo || !loginInfo.isEmp) {
      redirectVnpay();
    }
    */
        fetch(`${API_URL}/api/pay/buyticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tk}`,
            },
            body: JSON.stringify({
                id: '00000000-0000-0000-0000-000000000000',
                totalPrice: +totalPrice,
                orderTempId: mOrderId,
                payStatus: 1,
            }),
        })
            .then((res) => {
                console.log(res)
                return res.json()
            })
            .then((data) => {
                if (data.rspCode === '00') {
                    dispatch(getTicketDetail(mOrderId))
                    // dispatch(getTicketId(mOrderId));
                } else {
                    throw new Error(data.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, [mOrderId])

    const backHandler = (evt) => {}

    const thanhToanHandler = async (evt) => {
        // console.log(customerInfo);
        // console.log(items);
        const date = new Date()
        const createdDate = dateFormat(date, 'yyyymmddHHMMss')
        const ticketDetails = []
        const orderDetails = []
        // items.forEach((el) => {
        //   el.id.split(",").forEach(subEl => {
        //     const tkDetail = {
        //       placeId: subEl,
        //       childrenQuantity: el.childrenQuantity,
        //       adultQuantity: el.adultQuantity,
        //     };
        //     ticketDetails.push(tkDetail);
        //   })
        // });
        details.forEach((el) => {
            if (el.quantity > 0) {
                el.listPlaceID.split(',').forEach((subEl) => {
                    const tkDetail = {
                        placeId: +subEl,
                        customerType: el.custommerTypeId,
                        quantity: el.quantity,
                        ticketTypeId: el.ticketTypeId,
                    }
                    ticketDetails.push(tkDetail)
                })

                orderDetails.push({
                    ticketTypeId: el.ticketTypeId,
                    customerType: el.custommerTypeId,
                    quantity: el.quantity,
                    unitPrice: el.price,
                })
            }
        })
        const orderData = {
            order: { ...customerInfo, totalPrice, ID: createdDate },
            ticketDetails,
            orderDetails,
        }
        // console.log(details)
        dispatch(createOrderTemp(orderData))
        // window.location.href = directUrl;
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
            <MainHeader />
            <div className="hero-wrap layout-page">
                <div className="home-slider">
                    <div href="#" className="item">
                        {/* <div className="overlay"></div> */}
                        <div
                            className="img__bg"
                            style={{
                                backgroundImage: `url(${API_URL}/upload/${selectedPlace.imageUrl})`,
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>Thanh toán</h1>
                                    <ul className="slider-step">
                                        <li className="body-1">
                                            <span>01</span> Chọn vé
                                        </li>
                                        <li className="body-1">
                                            <span>02</span> Mua vé
                                        </li>
                                        <li className="active body-1">
                                            <span>03</span> Thanh toán
                                        </li>
                                        <li className="body-1">
                                            <span>04</span> Cám ơn
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-order">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="heading-section">
                                <h6 className="mb-25">Xác nhận thông tin</h6>
                            </div>
                            <dl className="row">
                                <dd className="col-md-2 col-6">Họ và tên:</dd>
                                <dt className="col-md-10 col-6">
                                    {(customerInfo && customerInfo.fullName) ||
                                        ''}
                                </dt>

                                <dd className="col-md-2 col-6">
                                    Số điện thoại:
                                </dd>
                                <dt className="col-md-4 col-6">
                                    {(customerInfo &&
                                        customerInfo.phoneNumber) ||
                                        ''}
                                </dt>

                                <dd className="col-md-2 col-6">CMND/CCCD:</dd>
                                <dt className="col-md-4 col-6">
                                    {(customerInfo && customerInfo.uniqId) ||
                                        ''}
                                </dt>

                                <dd className="col-md-2 col-6">Email:</dd>
                                <dt className="col-md-10 col-6">
                                    {(customerInfo && customerInfo.email) || ''}
                                </dt>

                                {/* <dd className="col-md-2 col-6">Đối tượng:</dd>
                <dt className="col-md-4 col-6">Khách Quốc tế</dt>

                <dd className="col-md-2 col-6">Loại vé:</dd>
                <dt className="col-md-4 col-6">Vé đoàn</dt>

                <dd className="col-md-2 col-6">Dịch vụ:</dd>
                <dt className="col-md-10 col-6">
                  Hướng dẫn thuyết minh, chụp ảnh
                </dt> */}
                            </dl>
                            <div
                                className="heading-section"
                                style={{
                                    display: `${
                                        loginInfo && loginInfo.isEmp
                                            ? 'none'
                                            : 'block'
                                    }`,
                                }}
                            >
                                <h6 className="mb-25">Chọn ngân hàng</h6>
                            </div>
                            <div className="option_payment">
                                <div className="option_banks">
                                    <select
                                        className="form-control"
                                        name="billBank"
                                        style={{
                                            display: `${
                                                loginInfo && loginInfo.isEmp
                                                    ? 'none'
                                                    : 'block'
                                            }`,
                                        }}
                                    >
                                        <option value="VNPAYQR">
                                            Ngân hàng VNPAYQR
                                        </option>
                                        <option value="NCB">
                                            Ngân hàng NCB
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div
                                className="btn-update text-right"
                                style={{ marginTop: '20px' }}
                            >
                                {/* <button className="btn btn-outline-primary mr-2" onClick={backHandler}>
                  Quay lại
                </button> */}
                                <Link
                                    className="btn btn-outline-primary mr-2"
                                    to={'/mua-ve'}
                                >
                                    Quay lại
                                </Link>
                                <button
                                    className="btn btn-primary"
                                    onClick={thanhToanHandler}
                                >
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div
                                className="total-ticket"
                                style={{ marginTop: '10px' }}
                            >
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage:
                                            'url(images/DaiNoi.jpg)',
                                    }}
                                >
                                    <div className="overley"></div>
                                    <h6>
                                        {(selectedPlace &&
                                            selectedPlace.placeName) ||
                                            ''}
                                    </h6>
                                </div>
                                <div className="content__total">
                                    <div className="subtitle-1">
                                        Thông tin đặt vé
                                    </div>
                                    <div className="quantily__total row">
                                        {details
                                            .filter((el) => el.quantity > 0)
                                            .map((el) => {
                                                return (
                                                    <div className="col">
                                                        <div className="quantily__item">
                                                            <span className="quantily__number">
                                                                {(el &&
                                                                    el.quantity) ||
                                                                    0}
                                                            </span>
                                                            <span>
                                                                {
                                                                    el.custommerTypeName
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                </div>
                                <div className="price__total">
                                    <span>Tổng cộng</span>
                                    <span className="price__nummber">
                                        {numberWithCommas(
                                            selectedPlace.totalPrice
                                        )}{' '}
                                        VNĐ
                                    </span>
                                </div>
                            </div>
                            {/* <div className="total-ticket">
                <div
                  className="img"
                  style={{ backgroundImage: "url(images/DaiNoi.jpg)" }}
                >
                  <div className="overley"></div>
                  <h6>{(selectedPlace && selectedPlace.title) || ""}</h6>
                </div>
                <div className="content__total">
                  <div className="subtitle-1">Thông tin đặt vé</div>
                  <div className="quantily__total row">
                    <div className="col">
                      <div className="quantily__item">
                        <span className="quantily__number">
                          {(selectedPlace && selectedPlace.adultQuantity) || 0}
                        </span>
                        <span>Người lớn</span>
                      </div>
                    </div>
                    <div className="col">
                      <div className="quantily__item">
                        <span className="quantily__number">
                          {(selectedPlace && selectedPlace.childrenQuantity) ||
                            0}
                        </span>
                        <span>Trẻ em</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price__total">
                  <span>Tổng cộng</span>
                  <span className="price__nummber">
                    {numberWithCommas(totalPrice)} VNĐ
                  </span>
                </div>
              </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
    )
}

export default PaymentQuickOrderPage
