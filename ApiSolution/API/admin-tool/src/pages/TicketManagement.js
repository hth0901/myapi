import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, Navigate, useLocation } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { useParams } from 'react-router-dom'

import classes from './TicketManagement.module.css'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const columns = [
    {
        name: 'Mã vé',
        selector: (row) => row.orderId,
    },
    {
        name: 'Ngày mua',
        selector: (row) => row.orderTime,
    },
    {
        name: 'Họ và tên',
        selector: (row) => row.fullName,
    },
    {
        name: 'Loại vé',
        selector: (row) => row.places,
    },
    {
        name: 'Nhân viên xuất vé',
        selector: (row) => row.createdBy,
    },
]

const TicketManagement = (props) => {
    const inputSearchRef = useRef()
    const navigate = useNavigate()
    const [tableData, setTableData] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)
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

    const searchHandler = (evt) => {
        evt.preventDefault()
        setCurrentPage(1)
        getDataTable(1)
    }

    const getDataTable = (page) => {
        const keyword = inputSearchRef.current.value
        console.log(keyword)
        fetch(`${API_URL}/api/Ticket/danhsachve/${page}?keyword=${keyword}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setTableData(data.listData)
                setTotalRows(data.totalRows)
            })
    }
    const handlePageChange = (page) => {
        getDataTable(page)
    }

    useEffect(() => {
        getDataTable(1)
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
                    <div className="col-6">
                        <div class="input-group mb-3">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Mã vé"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                ref={inputSearchRef}
                            />
                            <div class="input-group-append">
                                <button
                                    class="btn btn-outline-secondary"
                                    type="button"
                                    onClick={searchHandler}
                                >
                                    Tìm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <DataTable
                        columns={[
                            ...columns,
                            {
                                cell: (row, index, column, id) => {
                                    return (
                                        <Fragment>
                                            <i
                                                className="material-icons"
                                                style={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    console.log(row)
                                                    navigate(`${row.orderId}`)
                                                }}
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
                        paginationPerPage={20}
                        data={tableData}
                        pagination
                        paginationServer
                        paginationTotalRows={totalRows}
                        paginationDefaultPage={currentPage}
                        onChangePage={handlePageChange}
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default TicketManagement
