import React from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
// import DieuKhoanChung from '../components/dieukhoan/DieuKhoanChung'
// import DieuKhoanGiaoDich from '../components/dieukhoan/DieuKhoanGiaoDich'
// import HinhThucGiaoDich from '../components/dieukhoan/HinhThucThanhToan'

import classes from './DieuKhoanPage.module.css'

const DieuKhoanPage = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <div className={classes.sidenav}>
                        <ul style={{ listStyle: 'none' }}>
                            <li>
                                <NavLink
                                    className={(navData) => {
                                        return navData.isActive
                                            ? `nav-link ${classes.active}`
                                            : `nav-link`
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
                                            ? `nav-link ${classes.active}`
                                            : `nav-link`
                                    }}
                                    to="/dieu-khoan/giao-dich"
                                >
                                    Giao Dịch
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className={(navData) => {
                                        return navData.isActive
                                            ? `nav-link ${classes.active}`
                                            : `nav-link`
                                    }}
                                    to="/dieu-khoan/hinh-thuc-thanh-toan"
                                >
                                    Thanh toán
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-10">
                    {/* <Routes>
                        <Route
                            path="/dieu-khoan-chung"
                            element={<DieuKhoanChung />}
                        />
                        <Route
                            path="/giao-dich"
                            element={<DieuKhoanGiaoDich />}
                        />
                        <Route
                            path="/hinh-thuc-thanh-toan"
                            element={<HinhThucGiaoDich />}
                        />
                    </Routes> */}
                </div>
            </div>
        </div>
    )
}

export default DieuKhoanPage
