import React, { useEffect, useState, useRef } from 'react'
import { Fragment } from 'react'
import AOS from 'aos'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import DoanhThuNgay from '../components/thongke/DoanhThuNgay'
import LuotThamQuanNam from '../components/thongke/LuotThamQuanNam'
import ThamQuanDaiNoiNgay from '../components/thongke/ThamQuanDaiNoiNgay'
import LuotThamQuanNgay from '../components/thongke/LuotThamQuanNgay'
import { Navigate, useLocation } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

function pad(num, size) {
    num = num.toString()
    while (num.length < size) num = '0' + num
    return num
}

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const ThongKe = (props) => {
    const inputDateRef = useRef()
    const dateTime = new Date()
    const [day, setDate] = useState(dateTime)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const listYear = []
    for (let i = 1; i <= 5; i++) {
        listYear.push(dateTime.getFullYear() - i)
    }
    const [listShow, setListShow] = useState([])
    const [listShow2, setListShow2] = useState([])

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
        const currentDate = new Date()
        inputDateRef.current.valueAsDate = currentDate
        const d = currentDate.getDate()
        const m = currentDate.getMonth() + 1
        const y = currentDate.getFullYear()
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
        // fetch(`${API_URL}/api/ChiTietVe`, requestOptions)
        fetch(
            `${API_URL}/api/ChiTietVe/vebyid/${y}${pad(m, 2)}${pad(d, 2)}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                const listOrders = JSON.parse(result)
                fetch(`${API_URL}/api/DiaDiem`, requestOptions)
                    .then((response2) => response2.text())
                    .then((result2) => {
                        const listPlace = JSON.parse(result2)
                        if (listOrders.length > 0 && listPlace.length > 0) {
                            const listValuePlace = []
                            const listData = []
                            const listData2 = []
                            listYear.forEach((item) => {
                                listData2.push({
                                    year: item,
                                    adult: 0,
                                    child: 0,
                                })
                            })
                            listOrders.forEach((item) => {
                                // Tạo list cho biểu đồ lượt tham quan theo năm
                                listYear.forEach((item2) => {
                                    if (
                                        item2.toString() ===
                                        item.orderId.substring(0, 4)
                                    ) {
                                        const itemCheck = {}
                                        itemCheck.adult = 0
                                        itemCheck.child = 0
                                        if (item.customerType === 1) {
                                            itemCheck.adult =
                                                itemCheck.adult + item.quantity
                                        }
                                        if (item.customerType === 2) {
                                            itemCheck.child =
                                                itemCheck.child + item.quantity
                                        }
                                        const index = listData2.findIndex(
                                            (check) =>
                                                check.year.toString() ===
                                                item2.toString()
                                        )
                                        if (index != -1) {
                                            listData2[index].adult =
                                                listData2[index].adult +
                                                itemCheck.adult
                                            listData2[index].child =
                                                listData2[index].child +
                                                itemCheck.child
                                        }
                                    }
                                })
                                listValuePlace.push(item.placeId)
                            })
                            setListShow2(listData2)
                            const set = new Set(listValuePlace)
                            set.forEach((item) => {
                                const Single = {}
                                Single.Adult = 0
                                Single.Child = 0
                                Single.Specal = 0
                                listPlace.forEach((item2) => {
                                    if (item === item2.id) {
                                        Single.name = item2.title
                                    }
                                })
                                listOrders.forEach((item3) => {
                                    if (item3.placeId === item) {
                                        if (item3.customerType === 1) {
                                            Single.Adult =
                                                Single.Adult + item3.quantity
                                        }
                                        if (item3.customerType === 11) {
                                            Single.Specal =
                                                Single.Specal + item3.quantity
                                        } else {
                                            Single.Child =
                                                Single.Child + item3.quantity
                                        }
                                    }
                                })
                                listData.push(Single)
                            })
                            setListShow(listData)
                        }
                    })
                    .catch((error2) => console.log('error', error2))
            })
            .catch((error) => console.log('error', error))

        AOS.init({
            duration: 1500,
        })
    }, [])
    const ValueChange = (e) => {
        const datePick = new Date(e.target.value)
        const d = datePick.getDate()
        const m = datePick.getMonth() + 1
        const y = datePick.getFullYear()
        setDate(e.target.value)
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
        fetch(
            `${API_URL}/api/ChiTietVe/vebyid/${y}${pad(m, 2)}${pad(d, 2)}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => {
                const listOrders = JSON.parse(result)
                fetch(`${API_URL}/api/DiaDiem`, requestOptions)
                    .then((response2) => response2.text())
                    .then((result2) => {
                        const listPlace = JSON.parse(result2)
                        if (listOrders.length > 0 && listPlace.length > 0) {
                            const listValuePlace = []
                            const listData = []
                            const listData2 = []
                            listYear.forEach((item) => {
                                listData2.push({
                                    year: item,
                                    adult: 0,
                                    child: 0,
                                })
                            })
                            listOrders.forEach((item) => {
                                // Tạo list cho biểu đồ lượt tham quan theo năm
                                listYear.forEach((item2) => {
                                    if (
                                        item2.toString() ===
                                        item.orderId.substring(0, 4)
                                    ) {
                                        const itemCheck = {}
                                        itemCheck.adult = 0
                                        itemCheck.child = 0
                                        if (item.customerType === 1) {
                                            itemCheck.adult =
                                                itemCheck.adult + item.quantity
                                        }
                                        if (item.customerType === 2) {
                                            itemCheck.child =
                                                itemCheck.child + item.quantity
                                        }
                                        const index = listData2.findIndex(
                                            (check) =>
                                                check.year.toString() ===
                                                item2.toString()
                                        )
                                        if (index != -1) {
                                            listData2[index].adult =
                                                listData2[index].adult +
                                                itemCheck.adult
                                            listData2[index].child =
                                                listData2[index].child +
                                                itemCheck.child
                                        }
                                    }
                                })
                                listValuePlace.push(item.placeId)
                            })
                            setListShow2(listData2)
                            const set = new Set(listValuePlace)
                            set.forEach((item) => {
                                const Single = {}
                                Single.Adult = 0
                                Single.Child = 0
                                Single.Specal = 0
                                listPlace.forEach((item2) => {
                                    if (item === item2.id) {
                                        Single.name = item2.title
                                    }
                                })
                                listOrders.forEach((item3) => {
                                    if (item3.placeId === item) {
                                        if (item3.customerType === 1) {
                                            Single.Adult =
                                                Single.Adult + item3.quantity
                                        }
                                        if (item3.customerType === 2) {
                                            Single.Child =
                                                Single.Child + item3.quantity
                                        } else {
                                            Single.Specal =
                                                Single.Specal + item3.quantity
                                        }
                                    }
                                })
                                listData.push(Single)
                            })
                            setListShow(listData)
                        } else {
                            setListShow([])
                        }
                    })
                    .catch((error2) => console.log('error', error2))
            })
            .catch((error) => console.log('error', error))
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
            {/* <HomeSlider /> */}
            {/* <TestSlider /> */}

            <MainHeader />
            <div className="container">
                <div className="row" style={{ marginTop: '100px' }}>
                    <MainHeader />
                    <div className="col col-md-12">
                        <input
                            type="date"
                            ref={inputDateRef}
                            className="form-control pickTime"
                            onChange={ValueChange}
                            style={{ width: '20%', borderRadius: '8px' }}
                        />
                    </div>
                    <div className="col col-md-6">
                        <DoanhThuNgay dateString={day} />
                    </div>
                    {/* <div className="col col-md-6">
         <LuotThamQuanNam listData={listShow2}/>
        </div> */}
                    <div className="col col-md-6">
                        <LuotThamQuanNgay listData={listShow} />
                    </div>
                    {/* <div className="col col-md-6">
         <ThamQuanDaiNoiNgay/>
        </div> */}
                </div>
            </div>
            <MainFooter />
        </Fragment>
    )
}

export default ThongKe
