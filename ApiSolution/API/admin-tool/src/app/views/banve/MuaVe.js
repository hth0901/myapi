import React, { Fragment, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { placeCartActions } from 'store/placeCart-slice'
import { truyVanDanhSachDiaDiemGiaVe } from 'store/diadiem-actions'
import { SimpleCard } from 'app/components'

const BASE_URL = process.env.REACT_APP_URL

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const MuaVe = (props) => {
    const dispatch = useDispatch()

    const customerInfoFormRef = useRef()
    const history = useNavigate()

    const selectedPlace = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { totalPrice, details } = selectedPlace

    const { danhsachDiaDiemGiaVe: danhsachDiaDiem } = useSelector(
        (state) => state.diadiem
    )

    const updateQuantity = (val, type) => {
        dispatch(
            placeCartActions.quickOrderChangeQuantity({
                count: val,
                custommerTypeId: type,
            })
        )
    }

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiemGiaVe())
    }, [])

    useEffect(() => {
        dispatch(
            placeCartActions.initQuickOrder({
                selectedPlace: danhsachDiaDiem[0],
            })
        )
    }, [danhsachDiaDiem])

    const selectDiaDiemhandler = (val) => {
        const selectedPlace = danhsachDiaDiem.find((el) => el.id === val)
        dispatch(
            placeCartActions.replaceCartItem({
                selectedPlace,
            })
        )
    }

    const selectedPlaceHandler = (evt) => {
        const selectedValue = evt.target.value
        selectDiaDiemhandler(selectedValue)
    }

    const submitFormHandler = (evt) => {
        evt.preventDefault()
        history('xac-nhan')
    }

    return (
        <Fragment>
          
            <div className='m-sm-30'>
            <SimpleCard title="Mua vé tham quan">
                <div className="row">
                    <div className="col-md-8">
                        <div className="heading-section">
                            <h6>Thông tin vé tham quan</h6>
                        </div>
                        <form action="" className="order-ticket">
                            <div className="form-row">
                                <select
                                    className="form-control"
                                    placeholder="Điểm tham quan"
                                    value={
                                        (selectedPlace &&
                                            `${selectedPlace.placeId}`) ||
                                        ''
                                    }
                                    onChange={selectedPlaceHandler}
                                >
                                    <optgroup label="Danh sách địa điểm">
                                        {danhsachDiaDiem
                                            .filter((el) => {
                                                return (
                                                    el.id.split(',').length <= 1
                                                )
                                            })
                                            .map((el, idx) => {
                                                return (
                                                    <option
                                                        value={el.id}
                                                        key={el.id}
                                                    >
                                                        {el.title}
                                                    </option>
                                                )
                                            })}
                                    </optgroup>
                                    <optgroup label="Danh sách tuyến">
                                        {danhsachDiaDiem
                                            .filter((el) => {
                                                return (
                                                    el.id.split(',').length > 1
                                                )
                                            })
                                            .map((el, idx) => {
                                                return (
                                                    <option
                                                        value={el.id}
                                                        key={el.id}
                                                    >
                                                        {el.title}
                                                    </option>
                                                )
                                            })}
                                    </optgroup>
                                </select>
                            </div>
                            <div className="form-row">
                                {details.map((el, idx) => {
                                    return (
                                        <div
                                            key={idx}
                                            className="form-group col-md-4"
                                        >
                                            <label className="body-1 font-medium">
                                                {el.custommerTypeName}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                value={el.quantity}
                                                className="form-control"
                                                onChange={(evt) => {
                                                    const val = evt.target.value
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
                            </div>
                        </form>
                        <div className="heading-section">
                            <h6 className=" mt-30">Thông tin cá nhân</h6>
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
                                    name="fullName"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className="body-1 font-medium">
                                    Số điện thoại *
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phonenumber"
                                    placeholder="Số điện thoại"
                                    name="phoneNumber"
                                    required
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
                                    required
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
                            <div className="form-group text-right">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => {
                                        history(-1)
                                    }}
                                >
                                    Quay lại
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Tiếp tục
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4">
                        <div className="total-ticket">
                            <div className="content__total">
                                <div className="subtitle-1">
                                    Thông tin đặt vé
                                </div>
                                <div className="quantily__total row">
                                    {details
                                        .filter((el) => el.quantity > 0)
                                        .map((el, idx) => {
                                            return (
                                                <div key={idx} className="col">
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
            </SimpleCard>
            </div>
           
        </Fragment>
        
    )
}

export default MuaVe
