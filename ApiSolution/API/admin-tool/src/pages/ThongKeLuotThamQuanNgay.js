import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import AOS from 'aos'
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/common/MainFooter'
import LuotThamQuanNgay from '../components/thongke/LuotThamQuanNgay'
import SearchHighChart from '../components/thongke/SearchHighChart'

const API_URL = process.env.REACT_APP_URL

const ThongKeThamQuanNgay = (props) => {
    // const [listOrders,setListOrder] = useState([]);
    // const [listPlace,setListPlace] = useState([]);
    const [listShow, setListShow] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
        }
        fetch(`${API_URL}/api/ChiTietVe`, requestOptions)
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
                            listOrders.forEach((item) => {
                                listValuePlace.push(item.placeId)
                            })
                            const set = new Set(listValuePlace)
                            set.forEach((item) => {
                                const Single = {}
                                Single.Adult = 0
                                Single.Child = 0
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
    return (
        <Fragment>
            {/* <HomeSlider /> */}
            {/* <TestSlider /> */}
            <MainHeader />
            <div className="container">
                <div style={{ marginTop: '100px' }}>
                    <SearchHighChart />
                </div>
                <div className="row">
                    <MainHeader />
                    <div className="col col-md-12">
                        <LuotThamQuanNgay listData={listShow} />
                    </div>
                </div>
            </div>
            <MainFooter />
        </Fragment>
    )
}

export default ThongKeThamQuanNgay
