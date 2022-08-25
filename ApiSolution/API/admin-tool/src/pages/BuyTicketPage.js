import React, { Fragment, useEffect, useRef, useState } from 'react'
import AOS from 'aos'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from '../store/placeCart-slice'
import { orderActions } from '../store/order-slice'

import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const BuyTicketPage = (props) => {
    const customerInfoFormRef = useRef()
    const history = useNavigate()
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

    const dispatch = useDispatch()

    const [nameValue, setNameValue] = useState('Khách tham quan')

    const changeNameValueHandler = (evt) => {
        setNameValue(evt.target.value)
    }

    // const {
    //   placeObj: selectedPlace,
    //   adultQuantity,
    //   childrenQuantity,
    //   totalPrice,
    // } = useSelector((state) => state.ticket);

    // const { items, totalPrice } = useSelector((state) => state.placeCart);
    // const [selectedPlace] = items;
    const selectedPlace = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { totalPrice, details } = selectedPlace

    // console.log(selectedPlace, adultQuantity, childrenQuantity);

    const updateAdultQuantityHandler = (evt) => {
        const val = evt.target.value
        if (val < 0) return
        dispatch(
            placeCartActions.updateAdultQuantity({
                placeId: selectedPlace.id,
                count: val,
            })
        )
    }

    const updateQuantity = (val, type) => {
        dispatch(
            placeCartActions.quickOrderChangeQuantity({
                count: val,
                custommerTypeId: type,
            })
        )
    }

    const updateChildrenQuantityHandler = (evt) => {
        const val = evt.target.value
        if (val < 0) return
        dispatch(
            placeCartActions.updateChildrenQuantity({
                placeId: selectedPlace.id,
                count: val,
            })
        )
    }

    const submitFormHandler = (evt) => {
        evt.preventDefault()
        // console.log("submit");
        /*
    const myIP = await publicIp.v4();
    const { vnp_TmnCode, vnp_HashSecret, vnp_ReturnUrl, vnp_Url } = configData;
    const date = new Date();
    const createdDate = dateFormat(date, "yyyymmddHHmmss");
    const orderId = dateFormat(date, "HHmmss");

    const vnp_params = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnp_TmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
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

    // window.location.href = directUrl;
    */

        const checkCount = (el) => {
            return el.quantity > 0
        }

        const checkResult = selectedPlace.details.some(checkCount)

        if (!checkResult) {
            alert('Hãy nhập số lượng vé cần mua')
            return
        }

        const formData = {}
        ;[...customerInfoFormRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })

        dispatch(orderActions.setCustomerInfo(formData))

        history('/thanh-toan')
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
                                backgroundImage: 'url(images/DaiNoi.jpg)',
                            }}
                        ></div>
                        <div className="slider-content">
                            <div className="container">
                                <div className="slider-text">
                                    <h1>Mua vé</h1>
                                    <ul className="slider-step">
                                        <li className="body-1">
                                            <span>01</span> Chọn vé
                                        </li>
                                        <li className="active body-1">
                                            <span>02</span> Mua vé
                                        </li>
                                        <li className="body-1">
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
                        <div className="col-md-8" data-aos="fade-up">
                            <div className="heading-section">
                                <h6 className="mb-25">
                                    Thông tin vé tham quan
                                </h6>
                            </div>
                            <form action="" className="order-ticket">
                                <div className="form-row">
                                    {details.map((el) => {
                                        return (
                                            <div className="form-group col-md-4">
                                                <label className="body-1 font-medium">
                                                    {el.custommerTypeName}
                                                </label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={el.quantity}
                                                    className="form-control"
                                                    onChange={(evt) => {
                                                        const val =
                                                            evt.target.value
                                                        if (val < 0) return
                                                        updateQuantity(
                                                            val,
                                                            el.custommerTypeId
                                                        )
                                                    }}
                                                />
                                            </div>
                                        )
                                    })}
                                    {/* <div className="form-group col-md-4">
                    <label className="body-1 font-medium">Người lớn</label>
                    <input
                      type="number"
                      min="0"
                      value={
                        (selectedPlace && selectedPlace.adultQuantity) || 0
                      }
                      className="form-control"
                      onChange={updateAdultQuantityHandler}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label className="body-1 font-medium">Trẻ em</label>
                    <input
                      type="number"
                      min="0"
                      value={
                        (selectedPlace && selectedPlace.childrenQuantity) || 0
                      }
                      className="form-control"
                      onChange={updateChildrenQuantityHandler}
                    />
                  </div> */}
                                    {/* <div className="form-group col-md-4">
                    <label className="body-1 font-medium">Đối tượng</label>
                    <select className="form-control" id="selectdt">
                      <option>Khách Quốc tế</option>
                      <option>Khách trong nước</option>
                    </select>
                  </div> */}
                                </div>
                                {/* <div className="form-group">
                  <label className="w-100 body-1 font-medium" className="w-100">
                    Dịch vụ
                  </label>
                  <ul style={{ listStyleType: "none" }}>
                    <li>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label" htmlFor="gridCheck">
                          Chụp ảnh ngồi trên Ngai (không có cung nữ hầu)
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label">
                          Chụp ảnh ngồi trên Ngai (có 2 cung nữ hầu)
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label">
                          Chụp ảnh thêm (ngồi trên Kiệu)
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label">
                          Chụp ảnh ngồi trên Xe kéo
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label">
                          Hướng dẫn thuyết minh
                        </label>
                      </div>
                    </li>
                  </ul>
                </div> */}
                            </form>
                            <div className="heading-section">
                                <h6 className="mb-25 mt-30">
                                    Thông tin cá nhân
                                </h6>
                            </div>
                            <form
                                action=""
                                className="order-info"
                                onSubmit={submitFormHandler}
                                ref={customerInfoFormRef}
                            >
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        Họ và tên *
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="fullname"
                                        placeholder="Họ và tên"
                                        value={nameValue}
                                        name="fullName"
                                        onChange={changeNameValueHandler}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phonenumber"
                                        placeholder="Số điện thoại"
                                        name="phoneNumber"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Email"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="body-1 font-medium">
                                        Số CMND/CCCD
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="numbercard"
                                        placeholder="Số CMND"
                                        name="uniqId"
                                    />
                                </div>
                                <div class="form-group">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            id="gridCheck1"
                                        />
                                        <label
                                            class="form-check-label"
                                            for="gridCheck1"
                                        >
                                            Khách nước ngoài
                                        </label>
                                    </div>
                                </div>
                                <div className="form-group text-right">
                                    {/* <button className="btn btn-outline-primary mr-2">
                    Quay lại
                  </button> */}
                                    <Link
                                        to={'/home-page'}
                                        className="btn btn-outline-primary mr-2"
                                    >
                                        Quay lại
                                    </Link>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Tiếp tục
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4" data-aos="fade-up">
                            <div className="total-ticket">
                                <div
                                    className="img"
                                    style={{
                                        backgroundImage: `url(${BASE_URL}/upload/${selectedPlace.imageUrl})`,
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
                                        {/* <div className="col">
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
                    </div> */}
                                        {details
                                            .filter((el) => el.quantity > 0)
                                            .map((el) => {
                                                return (
                                                    <div className="col">
                                                        <div className="quantily__item">
                                                            <span className="quantily__number">
                                                                {el.quantity}
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
                                        {numberWithCommas(totalPrice)} VNĐ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
    )
}

export default BuyTicketPage
