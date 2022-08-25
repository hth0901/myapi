import React from "react";
import { useSelector } from "react-redux";

const ChangeQuantity = (props) => {
    const {custommerTypeId, custommerTypeName, val, changeQuantity} = props;
    // const currentSelected = useSelector(state => state.placeCart.quickOrderObject);
    const changeHandler = (evt) => {
        changeQuantity();
    }
    return (
        <div className="form-group col-md-4">
            <label className="body-1 font-medium">{custommerTypeName}</label>
            <input
                type="number"
                min="0"
                value={val}
                className="form-control"
                onChange={changeHandler}
            />
        </div>
    )
}

export default ChangeQuantity;