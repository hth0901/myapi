import React from 'react'

const TicketEditCustomerItem = (props) => {
    const { data, canEdit, onChange } = props

    const changeQuantityHandler = (evt) => {
        const val = +evt.target.value
        const type = data.customerType
        onChange(val, type)
    }

    return (
        <div className="row">
            <div className="col">
                <p>{data.customerTypeName}</p>
            </div>
            <div className="col">
                <input
                    type="number"
                    value={data.quantity}
                    onChange={changeQuantityHandler}
                    disabled={!canEdit}
                />
            </div>
            {/* <div className="col">
                <input type="number" value={data.quantityRemain} disabled />
            </div> */}
        </div>
    )
}

export default TicketEditCustomerItem
