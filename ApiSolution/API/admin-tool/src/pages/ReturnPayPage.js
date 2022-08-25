import React, { Fragment, useEffect } from "react";
import MainHeader from "../components/MainHeader";
import BannerSliderHome from "../components/trangchu/BannerSliderHome";
import ErrorModal from "../components/UI/ErrorModal";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTicketDetail } from "../store/order-actions";

const ReturnPayPage = (props) => {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const history = useNavigate();

  const ticketObj = useSelector((state) => state.order.orderInfo);

  const queryParams = new URLSearchParams(search);
  // const vnp_TmnCode = queryParams.get("vnp_TmnCode");
  // const vnp_Amount = queryParams.get("vnp_Amount");
  // const vnp_BankCode = queryParams.get("vnp_BankCode");
  // const vnp_BankTranNo = queryParams.get("vnp_BankTranNo");
  // const vnp_CardType = queryParams.get("vnp_CardType");
  // const vnp_PayDate = queryParams.get("vnp_PayDate");
  // const vnp_OrderInfo = queryParams.get("vnp_OrderInfo");
  // const vnp_TransactionNo = queryParams.get("vnp_TransactionNo");
  // const vnp_ResponseCode = queryParams.get("vnp_ResponseCode");
  const vnp_TransactionStatus = queryParams.get("vnp_TransactionStatus");
  const vnp_TxnRef = queryParams.get("vnp_TxnRef");
  // const vnp_SecureHashType = queryParams.get("vnp_SecureHashType");
  // const vnp_SecureHash = queryParams.get("vnp_SecureHash");

  useEffect(() => {
    if (ticketObj) {
      history(`/return-ticket?ticket=${ticketObj.ticketId}`);
    }
  }, [ticketObj]);

  useEffect(() => {
    setTimeout(() => {
      if (vnp_TransactionStatus !== "00") {
        history("/home-page");
      } else {
        dispatch(getTicketDetail(vnp_TxnRef));
      }
    }, 1500);
  }, []);

  const notificationContent = {
    title: "Thông báo",
    message: "Thanh toán thành công",
  };

  if (vnp_TransactionStatus !== "00") {
    notificationContent.message = "Thanh toán không thành công";
  }

  return (
    <Fragment>
      <ErrorModal
        title={notificationContent.title}
        message={notificationContent.message}
      />
      <MainHeader />
      <div>
        <div className="hero-wrap homepage js-fullheight">
          <BannerSliderHome />
        </div>
      </div>
    </Fragment>
  );
};

export default ReturnPayPage;
