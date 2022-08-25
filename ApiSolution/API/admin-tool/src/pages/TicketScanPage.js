import React, { Fragment, useEffect, useRef, useState } from 'react'
import MainFooter from '../components/common/MainFooter'
import MainHeader from '../components/MainHeader'
import { useDispatch, useSelector } from 'react-redux'
import { truyVanDanhSachDiaDiem } from '../store/diadiem-actions'
import { Html5Qrcode } from 'html5-qrcode'
import LoadingPanel from '../components/common/LoadingPanel'
import TickdetDetailModal from '../components/UI/TicketDetailModal'
import TicketErrorModal from 'components/UI/TicketErrorModal'
import { Navigate, useLocation } from 'react-router-dom'
const qrcodeRegionId = 'html5qr-code-full-region'

const BASE_URL = process.env.REACT_APP_URL

const API_URL = process.env.REACT_APP_URL

const TicketScanPage = (props) => {
    // const placeId = params.placeId;
    const dispatch = useDispatch()
    const [objResult, setObjResult] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [placeId, setPlaceId] = useState('')

    const [ticketObj, setTicketObj] = useState(null)
    const location = useLocation()

    const [isAuthen, setIsAuthen] = useState(true)

    const placeRef = useRef()

    // console.log(ticketObj);

    const danhsachDiaDiem = useSelector((state) => state.diadiem.danhsach)

    const arrTicketDetails = [
        ...((ticketObj && ticketObj.ticketPlaceDetails) || []),
    ]
    const objTicketDetail = {
        name: ticketObj && ticketObj.fullName,
        placeName: '',
        items: [],
        totalQuantity: 0,
        customerTypeName: '',
    }

    arrTicketDetails.forEach((el) => {
        let qrText = objResult.decodedText || ''
        qrText = qrText.replaceAll('<', '')
        qrText = qrText.replaceAll('>', '')
        let curCustomerType = qrText.split('|')[2] || ''
        // if (el.placeId === +placeId && el.customerType === +curCustomerType) {
        //     objTicketDetail.placeName = el.placeName
        //     objTicketDetail.items.push(`${el.quantity} ${el.customerTypeName}`)
        //     objTicketDetail.customerTypeName = el.customerTypeName
        //     objTicketDetail.totalQuantity += el.quantity
        // }
        const lstPlaces = (el.places || '').split(',')

        const isPlace = lstPlaces.some((el) => +el === placeId)

        if (el.customerType === +curCustomerType && isPlace) {
            objTicketDetail.placeName = el.placeName
            objTicketDetail.items.push(`${el.quantity} ${el.customerTypeName}`)
            objTicketDetail.customerTypeName = el.customerTypeName
            objTicketDetail.totalQuantity += el.quantity
        }
    })

    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        // setLstResult((prev) => [...prev, decodedResult]);
        const selectedPlaceId = placeRef.current.value
        setPlaceId(selectedPlaceId)
        setObjResult(decodedResult)
        setIsLoading(true)
    }

    const allowOneHanler = (evt) => {
        // alert('Vào một lượt');
        let qrText = objResult.decodedText || ''
        qrText = qrText.replaceAll('<', '')
        qrText = qrText.replaceAll('>', '')
        // alert(`${ticketObj.id}***${placeId}***${ticketObj.ticketId}***${qrText.split('|')[2]}`);
        fetch(`${API_URL}/api/Ticket/checkin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: ticketObj.id,
                placeId: placeId,
                ticketId: ticketObj.ticketId,
                quantity: 1,
                customerType: qrText.split('|')[2],
            }),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data) {
                    alert('Success')
                } else {
                    throw new Error('Process Error')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
            .finally(() => {
                setTicketObj(null)
            })
    }

    const allowAllHandler = (evt) => {
        // alert('Vào tất cả');
        let qrText = objResult.decodedText || ''
        qrText = qrText.replaceAll('<', '')
        qrText = qrText.replaceAll('>', '')
        // alert(`${ticketObj.id}***${placeId}***${ticketObj.ticketId}***${qrText.split('|')[2]}`);
        fetch(`${API_URL}/api/Ticket/checkin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: ticketObj.id,
                placeId: placeId,
                ticketId: ticketObj.ticketId,
                quantity: 2,
                customerType: qrText.split('|')[2],
            }),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data) {
                    alert('Success')
                } else {
                    throw new Error('Process Error')
                }
            })
            .catch((err) => {
                alert(err.message)
            })
            .finally(() => {
                setTicketObj(null)
            })
    }

    const qrCodeErrorCallback = (error) => {
        console.log(error)
    }

    useEffect(() => {
        dispatch(truyVanDanhSachDiaDiem())
    }, [dispatch])

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

    const onConfirm = (evt) => {
        setIsLoading(false)
        setErrorMessage('')
    }

    const closeTicketDetailHandler = (evt) => {
        setTicketObj(null)
    }

    useEffect(() => {
        // alert(`${objResult.decodedText || ''}---${placeId}`);
        // // alert(window.location.hostname);
        if (!objResult.decodedText || !placeId) {
            return
        }
        let dkm = objResult.decodedText
        // dkm = '<3ea826ed-647b-4854-a623-5eaafbce0f99>|<20220111080132>|<180000>';
        // var myHeaders = new Headers();
        // myHeaders.append("textscan", dkm);
        // myHeaders.append("placeid", placeId);
        fetch(`${API_URL}/api/Ticket/scanbyweb`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                qrString: dkm,
                placeId: placeId,
            }),
        })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.isValid) {
                    let qrText = dkm
                    qrText = qrText.replaceAll('<', '')
                    qrText = qrText.replaceAll('>', '')
                    const getTicketPromise = fetch(
                        `${API_URL}/api/Pay/ticket/${qrText.split('|')[1]}`
                    )
                    return getTicketPromise
                } else {
                    // setErrorMessage(data.message);
                    throw new Error(data.message)
                }
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setTicketObj(data)
            })
            .catch((err) => {
                setErrorMessage(err.message)
                // alert(err.message);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [objResult, placeId])

    useEffect(() => {
        if (isLoading || ticketObj || errorMessage) return

        const html5QrCode = new Html5Qrcode(qrcodeRegionId, false)
        html5QrCode.start(
            {
                facingMode: 'environment',
            },
            {
                fps: 10,
                qrbox: {
                    width: 250,
                    height: 250,
                },
            },
            qrCodeSuccessCallback,
            qrCodeErrorCallback
        )

        return () => {
            html5QrCode.stop().catch((error) => {
                console.log(error)
            })
        }
    }, [isLoading, ticketObj, errorMessage])

    let resultItem = <h5>Quét mã QR</h5>

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
            {errorMessage && (
                <TicketErrorModal
                    title="Thông báo"
                    message={errorMessage}
                    onConfirm={onConfirm}
                />
            )}
            {/* <TicketErrorModal onConfirm={onConfirm} /> */}
            {isLoading && <LoadingPanel />}
            {ticketObj && (
                <TickdetDetailModal
                    qrText={objResult.decodedText || ''}
                    data={objTicketDetail}
                    onConfirm={closeTicketDetailHandler}
                    onAllowOne={allowOneHanler}
                    onAllowAll={allowAllHandler}
                />
            )}
            {/* <TickdetDetailModal
                qrText={`<id>|<dive>|<2>|<2323>`}
                data={objTicketDetail}
                onConfirm={closeTicketDetailHandler}
                onAllowOne={allowOneHanler}
                onAllowAll={allowAllHandler}
            /> */}
            <MainHeader />
            {resultItem}
            <div>
                <select
                    name="diemthamquan"
                    className="form-control"
                    placeholder="Điểm tham quan"
                    ref={placeRef}
                >
                    {danhsachDiaDiem.map((el, idx) => {
                        return (
                            <option value={el.id} key={el.id}>
                                {el.title}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div id={qrcodeRegionId}></div>
            <MainFooter />
        </Fragment>
    )
}

export default TicketScanPage
