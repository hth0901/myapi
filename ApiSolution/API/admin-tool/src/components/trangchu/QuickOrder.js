import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { placeCartActions } from '../../store/placeCart-slice'
import { orderActions } from '../../store/order-slice'
import { truyVanDanhSachDiaDiemGiaVe } from '../../store/diadiem-actions'

import classes from './QuickOrder.module.css'

const QuickOrder = (props) => {
    const dispatch = useDispatch()

    const adultNumberRef = useRef()
    const childrenNumberRef = useRef()

    // const { isAuthenticated, isInitialised } = useSelector((state) => {
    //     return state.auth
    // })

    const items = useSelector((state) => state.placeCart.items)
    // const [currentSelected] = items;
    const currentSelected = useSelector(
        (state) => state.placeCart.quickOrderObject
    )
    const { details } = currentSelected
    const detailAdult = details.find((el) => el.custommerTypeId === 1)
    const detailChildren = details.find((el) => el.custommerTypeId === 2)

    const {
        danhsachDiaDiemGiaVe: danhsachDiaDiem,
        danhsachTuyenDiaDiemGiaVe: danhsachTuyen,
    } = useSelector((state) => state.diadiem)

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiemGiaVe())
    }, [])

    useEffect(() => {
        // if (danhsachDiaDiem.length > 0 && !currentSelected) {
        //   dispatch(
        //     placeCartActions.replaceCartItem({
        //       selectedPlace: danhsachDiaDiem[0],
        //       adultCount: 0,
        //       childrenCount: 0,
        //     })
        //   );
        // }

        dispatch(
            placeCartActions.initQuickOrder({
                selectedPlace: danhsachDiaDiem[0],
            })
        )

        dispatch(orderActions.resetOrder())
    }, [danhsachDiaDiem])

    const history = useNavigate()

    const submitHandler = (evt) => {
        evt.preventDefault()
        // if (currentSelected.adultQuantity && currentSelected.childrenQuantity) {
        //   history.push("/mua-ve");

        // }
        // else {
        //   history.push('/chon-ve');
        // }
        // if (!isAuthenticated) {
        //     alert('Vui lòng đăng nhập!!')
        // } else {
        //     history('/mua-ve')
        // }
        history('/mua-ve')

        // console.log(isAuthenticated)
    }

    const adultAddHandler = (evt) => {
        if (!currentSelected) return
        dispatch(
            // placeCartActions.increaseAdultQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: 1,
                custommerTypeId: 1,
            })
        )
    }

    const adultMinusHanlder = (evt) => {
        if (!currentSelected) return
        // if (currentSelected.adultQuantity === 0) return;
        const detail = details.find((el) => el.custommerTypeId === 1)
        if (!detail) return
        if (detail.quantity === 0) return
        dispatch(
            // placeCartActions.decreaseAdultQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: -1,
                custommerTypeId: 1,
            })
        )
    }

    const childrenAddHandler = (evt) => {
        if (!currentSelected) return
        dispatch(
            // placeCartActions.increaseChildrenQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: 1,
                custommerTypeId: 2,
            })
        )
    }

    const childrenMinusHanlder = (evt) => {
        if (!currentSelected) return
        // if (currentSelected.childrenQuantity === 0) return;
        const detail = details.find((el) => el.custommerTypeId === 2)
        if (!detail) return
        if (detail.quantity === 0) return
        dispatch(
            // placeCartActions.decreaseChildrenQuantity({ placeId: currentSelected.id })
            placeCartActions.quickOrderTuningQuantity({
                count: -1,
                custommerTypeId: 2,
            })
        )
    }

    const selectTuyenHandler = (val) => {}

    const selectDiaDiemhandler = (val) => {
        const selectedPlace = danhsachDiaDiem.find((el) => el.id === val)
        const adultNumber = +adultNumberRef.current.value
        const childrenNumber = +childrenNumberRef.current.value
        dispatch(
            placeCartActions.replaceCartItem({
                selectedPlace,
                adultCount: adultNumber,
                childrenCount: childrenNumber,
            })
        )
    }

    const selectedPlaceHandler = (evt) => {
        const selectedValue = evt.target.value
        // if (selectedValue.split(",").length > 1) {
        //   selectTuyenHandler(selectedValue);
        // }
        // else {
        //   selectDiaDiemhandler(selectedValue);
        // }

        selectDiaDiemhandler(selectedValue)
    }

    return (
        <div className="home-order block-17" style={{ bottom: '30px' }}>
            <div className="container">
                <form className="form-order" onSubmit={submitHandler}>
                    <div className="fields d-block d-flex">
                        <div className="group-order__select">
                            <i className="material-icons-outlined">place</i>
                            <div className="get__select">
                                <div className="select-wrap one-third">
                                    <div className="icon body-1">
                                        Điểm tham quan{' '}
                                        <i className="material-icons-outlined">
                                            keyboard_arrow_down
                                        </i>
                                    </div>
                                    <select
                                        name="diemthamquan"
                                        className="form-control"
                                        placeholder="Điểm tham quan"
                                        value={
                                            (currentSelected &&
                                                `${currentSelected.placeId}`) ||
                                            ''
                                        }
                                        onChange={selectedPlaceHandler}
                                    >
                                        <optgroup label="Danh sách địa điểm">
                                            {danhsachDiaDiem
                                                .filter((el) => {
                                                    return (
                                                        el.id.split(',')
                                                            .length <= 1
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
                                                        el.id.split(',')
                                                            .length > 1
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
                                <div className="font-medium body-1">
                                    {(currentSelected &&
                                        currentSelected.placeName) ||
                                        ''}
                                </div>
                            </div>
                        </div>
                        <div className="group-order__select">
                            <i className="material-icons-outlined">groups</i>
                            <div className="get__select">
                                <div className="body-1">Người lớn</div>
                                <div className="box">
                                    <div className="quantity">
                                        <span
                                            className="quantity-remove quantity-button"
                                            onClick={adultMinusHanlder}
                                        ></span>
                                        <input
                                            ref={adultNumberRef}
                                            type="number"
                                            step="0"
                                            min="0"
                                            value={
                                                (detailAdult &&
                                                    detailAdult.quantity) ||
                                                0
                                            }
                                            disabled
                                        />
                                        <span
                                            className="quantity-add quantity-button"
                                            onClick={adultAddHandler}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="group-order__select">
                            <i className="material-icons-outlined">groups</i>
                            <div className="get__select">
                                <div className="body-1">Trẻ em</div>
                                <div className="box">
                                    <div className="quantity">
                                        <span
                                            className="quantity-remove quantity-button"
                                            onClick={childrenMinusHanlder}
                                        ></span>
                                        <input
                                            ref={childrenNumberRef}
                                            type="number"
                                            step="0"
                                            min="0"
                                            value={
                                                (detailChildren &&
                                                    detailChildren.quantity) ||
                                                0
                                            }
                                            disabled
                                        />
                                        <span
                                            className="quantity-add quantity-button"
                                            onClick={childrenAddHandler}
                                        ></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input
                        type="submit"
                        className="search-submit btn btn-primary"
                        value="Đặt vé"
                    />
                </form>
            </div>
            <div className="copyright-home" style={{ bottom: '-30px' }}>
                <div className={`${classes.container}`}>
                    <a
                        href="http://online.gov.vn/Home/WebDetails/90813"
                        target="_blank"
                    >
                        <img
                            className={classes.img}
                            src="images/logoSaleNoti.png"
                        />
                    </a>
                    <p>
                        © 2022. Bản quyền Website thuộc về Trung tâm Bảo tồn Di
                        tích Cố đô Huế. Quyết định thành lập số 740 QĐ/UB do
                        UBND tỉnh Thừa Thiên Huế cấp ngày 10/6/1982.
                        <br />
                        Địa chỉ: Tam Toà, 23 Tống Duy Tân - Huế. Điện thoại:
                        +(84).234.3523237 - 3513322 – 3512751. Email:
                        huedisan@gmail.com{' '}
                        <Link to={'/dieu-khoan/dieu-khoan-chung'}>
                            Xem điều khoản sử dụng
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default QuickOrder
