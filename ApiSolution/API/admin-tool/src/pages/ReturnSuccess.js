import React, { useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import BannerSliderHome from '../components/trangchu/BannerSliderHome'
import QRCodeStyling from 'qr-code-styling'
import { getTicketDetail } from '../store/order-actions'
import { useDispatch, useSelector } from 'react-redux'

const API_URL = process.env.REACT_APP_URL

const ReturnSuccess = (props) => {
    const dispatch = useDispatch()
    const search = useLocation().search
    const history = useHistory()
    const name = new URLSearchParams(search).get('name')
    const qrVal = `<hoanghieu>|<hth0901@gmail.com>`
    const qrRef = useRef()
    //   useEffect(() => {
    //     history.push("/order");
    //   }, []);

    const ticketObj = useSelector((state) => state.order.orderInfo)

    const qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        image: 'images/hue_logo.png',
        dotsOptions: {
            color: '#4267b2',
            type: 'rounded',
        },
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 20,
        },
    })

    useEffect(() => {
        if (ticketObj) {
            console.log(ticketObj)
            // console.log(ticketObj);
            // qrCode.update({
            //   data: `<${ticketObj.ticketId}>|<${ticketObj.fullName}>|<${ticketObj.totalPrice}>`,
            // });
            // qrCode.append(qrRef.current);
            // history.push('/return-ticket');
        }
    }, [ticketObj])

    useEffect(() => {
        const queryParams = new URLSearchParams(search)
        const vnp_TxnRef = queryParams.get('vnp_TxnRef')
        dispatch(getTicketDetail(vnp_TxnRef))
        /*
    const queryParams = new URLSearchParams(search);
    const vnp_TmnCode = queryParams.get("vnp_TmnCode");
    const vnp_Amount = queryParams.get("vnp_Amount");
    const vnp_BankCode = queryParams.get("vnp_BankCode");
    const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");
    const vnp_CardType = queryParams.get("vnp_CardType");
    const vnp_PayDate = queryParams.get("vnp_PayDate");
    const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
    const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
    const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
    const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
    const vnp_TxnRef = queryParams.get("vnp_TxnRef");
    const vnp_SecureHashType = queryParams.get("vnp_SecureHashType");
    const vnp_SecureHash = queryParams.get("vnp_SecureHash");
    const urlParams = `vnp_TmnCode=${vnp_TmnCode}&vnp_Amount=${vnp_Amount}&vnp_BankCode=${vnp_BankCode}&vnp_BankTranNo=${vnp_BankTranNo}&vnp_CardType=${vnp_CardType}&vnp_PayDate=${vnp_PayDate}&vnp_OrderInfo=${vnp_OrderInfo}&vnp_TransactionNo=${vnp_TransactionNo}&vnp_ResponseCode=${vnp_ResponseCode}&vnp_TransactionStatus=${vnp_TransactionStatus}&vnp_TxnRef=${vnp_TxnRef}&vnp_SecureHashType=${vnp_SecureHashType}&vnp_SecureHash=${vnp_SecureHash}`;

    fetch(`${configData.apiBaseUrl}/Pay/ipncheat?${urlParams}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.rspCode === "00") {
          dispatch(getTicketDetail(vnp_TxnRef));
        }
      })
      .catch((err) => {
        console.log(err);
      });
      */

        // const sendCheat = async () => {
        //   const response = await fetch(
        //     `https://localhost:44311/api/Pay/ipn?${urlParams}`
        //   );

        //   if (!response.ok) {
        //     const errorMessage = await response.text();
        //     throw new Error(errorMessage);
        //   }

        //   const data = await response.json();

        //   return data;
        // };
    }, [])

    const btnClickHandler = (evt) => {
        const myCanvas = qrRef.current.querySelector('canvas')
        // console.log(myCanvas.toDataURL());

        var formdata = new FormData()
        formdata.append('ToName', 'hoang hieu')
        formdata.append('ToEmail', 'hth0901@gmail.com')
        formdata.append('Subject', 'thử tiếp nè')
        formdata.append('Body', 'đây là vé vô cửa')
        formdata.append('QrString', myCanvas.toDataURL())

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow',
        }

        fetch(`${API_URL}/api/Mail/sendticketqr`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error))
    }

    return (
        <div className="hero-wrap homepage js-fullheight">
            <BannerSliderHome />
            <h1>Thanh toán thành công</h1>
            {/* <QRCode
        value={qrVal}
        logoImage="images/hue_logo.png"
        logoWidth={50}
        eyeRadius={[
          [10, 10, 0, 10], // top/left eye
          [10, 10, 10, 0], // top/right eye
          [10, 0, 10, 10], // bottom/left
        ]}
      /> */}
            <div ref={qrRef} />
            <button onClick={btnClickHandler}>test</button>
        </div>
    )
}

export default ReturnSuccess
