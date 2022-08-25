import React, { useEffect, useState, Fragment, useMemo } from 'react'

import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

import classes from './TestTablePage.module.css'
import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const columns = [
    {
        name: 'Ngày mua',
        selector: (row) => row.orderTime,
    },
    {
        name: 'Họ và tên',
        selector: (row) => row.fullName,
    },
    {
        name: 'Số điện thoại',
        selector: (row) => row.phoneNumber,
    },
    {
        name: 'Email',
        selector: (row) => row.email,
    },
]

const FilterComponent = (props) => {
    const { filterText, onFilter, onClear } = props
    return (
        <Fragment>
            <input
                id="search"
                value={filterText}
                onChange={onFilter}
                type={'text'}
                className={classes.input_text}
            />
            {/* <input type='button' className={classes.btn_clear} onClick={onClear} value={'X'} /> */}
            <button
                type="button"
                className={classes.btn_clear}
                onClick={onClear}
            >
                X
            </button>
        </Fragment>
    )
}

const TicketListPage = (props) => {
    const [tableData, setTableData] = useState([])
    const [filterText, setFilterText] = useState('')
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const filteredItems = tableData.filter(
        (item) =>
            item.orderTime &&
            item.orderTime.toLowerCase().includes(filterText.toLowerCase())
    )

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle)
                setFilterText('')
            }
        }

        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        )
    }, [filterText, resetPaginationToggle])

    const deleteHanlder = (tkId) => {
        console.log(tkId)
        fetch(`${API_URL}/api/Ticket/xoave/${tkId}`, { method: 'DELETE' })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (!data) {
                    throw new Error('Proccess Error!!')
                }
                return fetch(`${API_URL}/api/Ticket/danhsachve`)
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTableData(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    useEffect(() => {
        fetch(`${API_URL}/api/Ticket/danhsachve`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTableData(data)
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
                className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light no-fix"
                id="ftco-navbar"
            >
                <div className="overlay-blur"></div>
                <div className="container-fluid">
                    <a className="navbar-brand" href="index.html">
                        <img src="images/logo.svg" alt="img-fluid" />
                    </a>
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

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home-page">
                                    trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/kham-pha">
                                    khám phá
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/thong-ke">
                                    Thống kê
                                </Link>
                            </li>
                            <li className="nav-item cta cta-outline">
                                <Link className="nav-link" to="/lien-he">
                                    liên hệ
                                </Link>
                            </li>
                            <li className="nav-item cta">
                                <Link className="nav-link" to="/chon-ve">
                                    đặt vé
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="action-nav">
                        <ul>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    search
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/gio-hang"
                                    className="material-icons-outlined"
                                >
                                    shopping_cart
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    perm_identity
                                </Link>{' '}
                            </li>
                            <li>
                                <Link
                                    to="/chon-ve"
                                    className="material-icons-outlined"
                                >
                                    language
                                </Link>{' '}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="ftco-section ftco-addcart">
                <div className="container">
                    <DataTable
                        title="Danh sách vé"
                        columns={[
                            ...columns,
                            {
                                cell: (row, index, column, id) => {
                                    return (
                                        <Fragment>
                                            <i
                                                className="material-icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => console.log(row)}
                                            >
                                                create
                                            </i>
                                            &nbsp;&nbsp;
                                            <i
                                                className="material-icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    deleteHanlder(row.ticketId)
                                                }
                                            >
                                                delete_forever
                                            </i>
                                        </Fragment>
                                    )
                                },
                            },
                        ]}
                        data={filteredItems}
                        pagination
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                    />
                </div>
            </section>
        </Fragment>
    )
}

export default TicketListPage
