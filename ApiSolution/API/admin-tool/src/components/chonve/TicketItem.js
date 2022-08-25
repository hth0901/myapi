import React from "react";
import { placeCartActions } from "../../store/placeCart-slice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const TicketItem = (props) => {
  const { title, price, image, placeDetail } = props;
  const history = useNavigate();
  const dispatch = useDispatch();

  const selectPlaceHandler = (evt) => {
    if (!evt.target.classList.contains("img")) return;
    dispatch(
      placeCartActions.replaceCartItem({
        selectedPlace: placeDetail,
        adultCount: 1,
        childrenCount: 0,
      })
    );
    history("/mua-ve");
  };

  const selectToCartHandler = (evt) => {
    dispatch(placeCartActions.addItemToCart({ selectedPlace: placeDetail }));
  };

  return (
    <div className="col-md-4 box-scroll">
      <div
        className="destination destination-1"
        style={{ cursor: "pointer" }}
        onClick={selectPlaceHandler}
      >
        <div className="overley" style={{ pointerEvents: "none" }}></div>
        <div
          className="img d-flex justify-content-end align-items-start"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div
            className="icon d-flex justify-content-center align-items-center"
            onClick={selectToCartHandler}
          >
            <span className="material-icons-outlined">shopping_cart</span>
          </div>
        </div>
        <div className="text">
          <h6>{title}</h6>
          <span className="listing body-2">
            Từ <strong>{numberWithCommas(price)}</strong> VNĐ/Người
          </span>
        </div>
      </div>
      {/* <Link to="" className="destination destination-1">
        <div className="overley" style={{pointerEvents: 'none'}}></div>
        <div
          className="img d-flex justify-content-end align-items-start"
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className="icon d-flex justify-content-center align-items-center" onClick={selectToCartHandler}>
            <span className="material-icons-outlined">shopping_cart</span>
          </div>
        </div>
        <div className="text">
          <h6>{title}</h6>
          <span className="listing body-2">
            Từ <strong>{numberWithCommas(price)}</strong> VNĐ/Người
          </span>
        </div>
      </Link> */}
    </div>
  );
};

export default TicketItem;
