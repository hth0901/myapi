import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { authenActions } from '../store/authen-slice'

const MainHeader = (props) => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.authen.isLoggedIn)
    const userInfo = useSelector((state) => state.authen.userInfo)

    const logoutHandler = (evt) => {
        dispatch(authenActions.logout())
    }

    return (
        <nav
            className={`main_header_nav navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light`}
        >
            <div className="overlay-blur"></div>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="./images/logo.svg"></img>
                </a>
                <button className="navbar-toggler">
                    <span className="oi oi-menu"></span>Menu
                </button>
                <div className="collapse navbar-collapse" id="ftco-nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink
                                // className="nav-link"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                                // activeClassName="active"
                                to="/home-page"
                            >
                                trang chủ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                // className="nav-link"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                                // activeClassName="active"
                                to="/kham-pha"
                            >
                                khám phá
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                // className="nav-link"
                                // activeClassName="active"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                                to="/thong-ke"
                            >
                                Thống kê
                            </NavLink>
                        </li>
                        <li className="nav-item cta cta-outline">
                            <NavLink
                                // className="nav-link"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                                // activeClassName="active"
                                to="/lien-he"
                            >
                                liên hệ
                            </NavLink>
                        </li>
                        <li className="nav-item cta">
                            <NavLink
                                // className="nav-link"
                                className={(navData) => {
                                    return navData.isActive
                                        ? 'nav-link active'
                                        : 'nav-link'
                                }}
                                // activeClassName="active"
                                to="/chon-ve"
                            >
                                đặt vé
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="action-nav">
                    <ul>
                        {/* <li><Link to="/chon-ve" className="material-icons-outlined">search</Link> </li> */}
                        <li>
                            <Link
                                to={'/danh-sach-ve'}
                                className="material-icons-outlined"
                            >
                                search
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/gio-hang"
                                className="material-icons-outlined"
                            >
                                shopping_cart
                            </Link>{' '}
                        </li>
                        {!isLoggedIn && (
                            <li>
                                <Link
                                    to="/dangnhap"
                                    className="material-icons-outlined"
                                >
                                    perm_identity
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            // <li>
                            //   <span className="nav-link">{userInfo.username}</span>
                            // </li>
                            <button
                                className="btn btn-primary"
                                onClick={logoutHandler}
                            >
                                {userInfo.username}
                            </button>
                        )}
                        {isLoggedIn && (
                            <li>
                                <button
                                    className="btn btn-primary"
                                    onClick={logoutHandler}
                                >
                                    Đăng xuất
                                </button>
                            </li>
                        )}
                        {/* <li><Link to="/chon-ve" className="material-icons-outlined">language</Link> </li> */}
                    </ul>
                </div>
                {/* <div className="action-nav">
          <ul>
            <li><button className="btn btn-primary">Đăng xuất</button></li>
          </ul>
        </div> */}
            </div>
        </nav>
    )
}
export default MainHeader
