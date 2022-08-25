import React, { useEffect, useState, Fragment, useMemo } from 'react'

import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom'

import classes from './TestTablePage.module.css'

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

const TestTablePage = (props) => {
    // const [tableData, setTableData] = useState([])
    // const [filterText, setFilterText] = useState('')
    // const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    // const filteredItems = tableData.filter(
    //     (item) =>
    //         item.orderTime &&
    //         item.orderTime.toLowerCase().includes(filterText.toLowerCase())
    // )

    // const subHeaderComponentMemo = useMemo(() => {
    //     const handleClear = () => {
    //         if (filterText) {
    //             setResetPaginationToggle(!resetPaginationToggle)
    //             setFilterText('')
    //         }
    //     }

    //     return (
    //         <FilterComponent
    //             onFilter={(e) => setFilterText(e.target.value)}
    //             onClear={handleClear}
    //             filterText={filterText}
    //         />
    //     )
    // }, [filterText, resetPaginationToggle])

    // const deleteHanlder = (tkId) => {
    //     console.log(tkId)
    //     fetch(`${API_URL}/api/Ticket/xoave/${tkId}`, { method: 'DELETE' })
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             if (!data) {
    //                 throw new Error('Proccess Error!!')
    //             }
    //             return fetch(`${API_URL}/api/Ticket/danhsachve`)
    //         })
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             setTableData(data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }

    // useEffect(() => {
    //     fetch(`${API_URL}/api/Ticket/danhsachve`)
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             setTableData(data)
    //         })
    // }, [])

    // return (
    //     <DataTable
    //         columns={[
    //             ...columns,
    //             {
    //                 cell: (row, index, column, id) => {
    //                     return (
    //                         <Fragment>
    //                             <i
    //                                 className="material-icons"
    //                                 style={{ cursor: 'pointer' }}
    //                                 onClick={() => console.log(row)}
    //                             >
    //                                 create
    //                             </i>
    //                             &nbsp;&nbsp;
    //                             <i
    //                                 className="material-icons"
    //                                 style={{ cursor: 'pointer' }}
    //                                 onClick={() => deleteHanlder(row.ticketId)}
    //                             >
    //                                 delete_forever
    //                             </i>
    //                         </Fragment>
    //                     )
    //                 },
    //             },
    //         ]}
    //         data={filteredItems}
    //         pagination
    //         subHeader
    //         subHeaderComponent={subHeaderComponentMemo}
    //     />
    // )

    // const [tableData, setTableData] = useState([])
    // const [totalRows, setTotalRows] = useState(0)

    // const deleteHanlder = (tkId) => {
    //     console.log(tkId)
    //     fetch(`${API_URL}/api/Ticket/xoave/${tkId}`, { method: 'DELETE' })
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             if (!data) {
    //                 throw new Error('Proccess Error!!')
    //             }
    //             return fetch(`${API_URL}/api/Ticket/danhsachve`)
    //         })
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             setTableData(data)
    //         })
    //         .catch((err) => {
    //             console.log(err.message)
    //         })
    // }

    // const getDataTable = (page) => {
    //     fetch(`${API_URL}/api/Ticket/danhsachve/${page}`)
    //         .then((res) => {
    //             return res.json()
    //         })
    //         .then((data) => {
    //             console.log(data)
    //             setTableData(data.listData)
    //             setTotalRows(data.totalRows)
    //         })
    // }

    // const handlePageChange = (page) => {
    //     getDataTable(page)
    // }

    // useEffect(() => {
    //     getDataTable(1)
    // }, [])

    return (
        // <DataTable
        //     columns={[
        //         ...columns,
        //         {
        //             cell: (row, index, column, id) => {
        //                 return (
        //                     <Fragment>
        //                         <i
        //                             className="material-icons"
        //                             style={{ cursor: 'pointer' }}
        //                             onClick={() => console.log(row)}
        //                         >
        //                             create
        //                         </i>
        //                         &nbsp;&nbsp;
        //                         <i
        //                             className="material-icons"
        //                             style={{ cursor: 'pointer' }}
        //                             onClick={() => deleteHanlder(row.ticketId)}
        //                         >
        //                             delete_forever
        //                         </i>
        //                     </Fragment>
        //                 )
        //             },
        //         },
        //     ]}
        //     data={tableData}
        //     pagination
        //     paginationServer
        //     paginationTotalRows={totalRows}
        //     onChangePage={handlePageChange}
        // />
        <Fragment>
            <div>
                <h3>hihihehe</h3>
            </div>
        </Fragment>
    )
}

export default TestTablePage
