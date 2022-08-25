import React, { useEffect } from "react";
import { placeCartActions } from "../../store/placeCart-slice";
import { useDispatch } from "react-redux";

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

const PlaceCartItem = (props) => {
    const dispatch = useDispatch();
    const cartItem = { ...props.placeItem};

    // const totalPrice = cartItem.adultQuantity * cartItem.adultPrice + cartItem.childrenQuantity * cartItem.childrenPrice
    const {totalPrice, details} = cartItem;

    useEffect(() => {
        if (totalPrice === 0) {
            dispatch(placeCartActions.reset());
        }
    }, [totalPrice])

    const changeAdultQuantityHandler = (evt) => {
        const val = +evt.target.value;
        if (val < 0) return;
        dispatch(placeCartActions.updateAdultQuantity({placeId: cartItem.id, count: val}));
    }

    const decreaseAdultQuantityHandler = (evt) => {
        dispatch(placeCartActions.decreaseAdultQuantity({placeId: cartItem.id }));
    }
    const increaseAdultQuantityHandler = (evt) => {
        dispatch(placeCartActions.increaseAdultQuantity({placeId: cartItem.id }));
    }

    const changeChildrenQuantityHandler = (evt) => {
        const val = +evt.target.value;
        if (val < 0) return;
        dispatch(placeCartActions.updateChildrenQuantity({placeId: cartItem.id, count: val}));
    }

    const decreaseChildrenQuantityHandler = (evt) => {
        dispatch(placeCartActions.decreaseChildrenQuantity({placeId: cartItem.id }));
    }
    const increaseChildrenQuantityHandler = (evt) => {
        dispatch(placeCartActions.increaseChildrenQuantity({placeId: cartItem.id}));
    }

    const checkBoxClickHandler = (evt, arg) => {
        const isChecked = evt.target.checked;
        console.log(isChecked);
        props.checkCart(cartItem.id, isChecked);
    }

    const turningQuantityHandler = (placeId, custommerTypeId, count) => {
        // console.log(placeId, custommerTypeId, count);
        dispatch(placeCartActions.turningQuantity({placeId, custommerTypeId, count}));
    }

    const changeQuantityHandler = (placeId, custommerTypeId, count) => {
        // console.log(placeId, custommerTypeId, count);
    }

    return (
        <div className="addcart-list__item">
            <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id={`checkItem_${cartItem.id}`} onChange={checkBoxClickHandler} />
                <label className="custom-control-label" htmlFor={`checkItem_${cartItem.id}`}></label>
            </div>
            <div className="media">
                <div className="bg_img" style={{backgroundImage: 'url(images/DaiNoi.jpg)'}}></div>
                <div className="media-body">
                    <h6 className="mt-0">{cartItem.placeName}</h6>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md">
                                    <span>Loại vé:</span>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '5px'}}>
                                <div className="col-md">
                                    <span>Đối tượng:</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="row">
                                <div className="col-md">
                                    <span>Vé đơn</span>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '5px'}}>
                                <div className="col-md">
                                    <span>Vé đơn</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {details.map(el => {
                                return (
                                    <div className="row">
                                        <div className="col-md text-right">
                                            <span>{el.custommerTypeName}:</span>
                                        </div>
                                        <div className="col-md text-right">
                                            <div className="quantity">
                                                <span className="quantity-remove quantity-button" onClick={() => turningQuantityHandler(cartItem.placeId, el.custommerTypeId, -1)}></span>
                                                <input type="number" name="demoInput" step="0" min="0" value={el.quantity} onChange={(evt) => {
                                                    const val = +evt.target.value;
                                                    if (val < 0) return;
                                                    changeQuantityHandler(cartItem.placeId, el.custommerTypeId, val);
                                                }} disabled />
                                                <span className="quantity-add quantity-button" onClick={() => turningQuantityHandler(cartItem.placeId, el.custommerTypeId, 1)}></span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                            {/* <div className="row">
                                <div className="col-md text-right">
                                    <span>Người lớn:</span>
                                </div>
                                <div className="col-md text-right">
                                    <div className="quantity">
                                        <span className="quantity-remove quantity-button" onClick={decreaseAdultQuantityHandler}></span>
                                        <input type="number" name="demoInput" step="0" min="0" value={cartItem.adultQuantity} onChange={changeAdultQuantityHandler} />
                                        <span className="quantity-add quantity-button" onClick={increaseAdultQuantityHandler}></span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md text-right">
                                    <span>Tre em:</span>
                                </div>
                                <div className="col-md text-right">
                                    <div className="quantity">
                                        <span className="quantity-remove quantity-button" onClick={decreaseChildrenQuantityHandler}></span>
                                        <input type="number" name="demoInput1" step="0" min="0" value={cartItem.childrenQuantity} onChange={changeChildrenQuantityHandler} />
                                        <span className="quantity-add quantity-button" onClick={increaseChildrenQuantityHandler}></span>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    {/* <div className="row">
                        <div className="col-md-3">
                            <span>Loại vé:</span>
                        </div>
                        <div className="col-md-3">
                            <span>Vé đơn</span>
                        </div>
                        <div className="col-md-3 text-right">
                            <span>Người lớn:</span>
                        </div>
                        <div className="col-md-3 text-right">
                            <div className="quantity">
                                <span className="quantity-remove quantity-button" onClick={decreaseAdultQuantityHandler}></span>
                                <input type="number" name="demoInput" step="0" min="0" value={cartItem.adultQuantity} onChange={changeAdultQuantityHandler} />
                                <span className="quantity-add quantity-button" onClick={increaseAdultQuantityHandler}></span>
                            </div>
                        </div>                      
                    </div>
                    <div className="row mt-2">                      
                        <div className="col-md-3">
                            <span>Đối tượng:</span>
                        </div>
                        <div className="col-md-3">
                            <span>Khách quốc tế</span>
                        </div>
                        <div className="col-md-3 text-right">
                            <span>Trẻ em:</span>
                        </div>
                        <div className="col-md-3 text-right">
                            <div className="quantity">
                                <span className="quantity-remove quantity-button" onClick={decreaseChildrenQuantityHandler}></span>
                                <input type="number" name="demoInput1" step="0" min="0" value={cartItem.childrenQuantity} onChange={changeChildrenQuantityHandler} />
                                <span className="quantity-add quantity-button" onClick={increaseChildrenQuantityHandler}></span>
                            </div>
                        </div>
                    </div> */}
                    <div className="row mt-3 row-total">
                        <div className="col-md-6">
                            <span>Tổng cộng</span>
                        </div>
                        <div className="col-md-6 text-right">
                            <span>{numberWithCommas(totalPrice)} VNĐ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaceCartItem;