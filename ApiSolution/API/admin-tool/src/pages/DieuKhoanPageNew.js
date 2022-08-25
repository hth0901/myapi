import React from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'
import classes from './KdcTestPage.module.css'
// import classes from './DieuKhoan.module.css'

import DieuKhoanChung from './DieuKhoanChung'
import HinhThucGiaoDich from './HinhThucThanhToan'
import DieuKhoanGiaoDich from './DieuKhoanGiaoDich'

const DieuKhoanPageNew = (props) => {
    return (
        <div className="container">
            <div className={classes.header}>
                <Link className="navbar-brand" to={'/home-page'}>
                    <img src="/images/logo.svg"></img>
                </Link>
            </div>

            <div className={classes.row}>
                <div
                    className={`${classes['col-3']} ${classes['col-s-3']} ${classes['menu']}`}
                >
                    <ul>
                        <li>
                            <NavLink
                                className={(navData) => {
                                    return navData.isActive
                                        ? `${classes.active}`
                                        : ''
                                }}
                                to="/dieu-khoan/dieu-khoan-chung"
                            >
                                Điều khoản chung
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={(navData) => {
                                    return navData.isActive
                                        ? `${classes.active}`
                                        : ''
                                }}
                                to="/dieu-khoan/giao-dich"
                            >
                                Giao dịch
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                className={(navData) => {
                                    return navData.isActive
                                        ? `${classes.active}`
                                        : ''
                                }}
                                to="/dieu-khoan/hinh-thuc-thanh-toan"
                            >
                                Thanh toán
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Routes>
                    <Route
                        path="/dieu-khoan-chung"
                        element={<DieuKhoanChung />}
                    />
                    <Route path="/giao-dich" element={<DieuKhoanGiaoDich />} />
                    <Route
                        path="/hinh-thuc-thanh-toan"
                        element={<HinhThucGiaoDich />}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default DieuKhoanPageNew
