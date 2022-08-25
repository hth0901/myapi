import { SimpleCard } from 'app/components'
import React, { useState } from 'react'
import TicketEditCustomerItem from './TicketEditCustomerItem'

const API_URL = process.env.REACT_APP_URL

const TicketEditItem = (props) => {
    const tk = localStorage.getItem('token')
    const { data, onRefresh } = props
    const [childData, setChildData] = useState(
        data.items.map((el) => {
            return { ...el }
        })
    )
    const [canEdit, setCanEdit] = useState(false)

    const changeQuantityHandler = (val, type) => {
        childData.forEach((el) => {
            if (el.customerType === type) {
                const span = val - el.quantity
                el.quantityRemain = el.quantityRemain + span
                if (el.quantityRemain < 0) {
                    el.quantityRemain = 0
                }
                el.quantity = val
                if (el.quantity < 0) {
                    el.quantity = 0
                }
            }
        })
        setChildData([...childData])
    }

    const cancelHandler = (evt) => {
        setCanEdit(false)
        setChildData(
            data.items.map((el) => {
                return { ...el }
            })
        )
    }

    const btnEditClickHandler = (evt) => {
        // console.log(data)
        if (data.isUsed) {
            alert('Vé đã được sử dụng nên không được chỉnh sửa')
            return
        }
        setCanEdit(true)
    }

    const saveHandler = (evt) => {
        console.log(childData)
        // return
        let totalCountEdit = 0
        childData.forEach((el) => {
            totalCountEdit += el.quantity
        })
        let totalCount = 0
        data.items.forEach((el) => {
            totalCount += el.quantity
        })

        console.log(`count edit: ${totalCountEdit}`)
        console.log(`count: ${totalCount}`)

        if (totalCount !== totalCountEdit) {
            alert('Cập nhật không thành công, hãy kiểm tra lại số lượng')
            return
        }

        fetch(`${API_URL}/api/ticket/updateticketdetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tk}`,
            },
            body: JSON.stringify({ ticketDetails: [...childData] }),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(
                        'Cập nhật không thành công, liên hệ bộ phận dev'
                    )
                }
                return res.json()
            })
            .then((data) => {
                alert('Cập nhật thành công')
                setCanEdit(false)
                onRefresh()
            })
            .catch((er) => {
                alert(er.message)
                return
            })
    }

    //box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

    return (
        <div
            className=""
            style={{
                boxShadow:
                    'rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px',
                padding: '10px',
                borderRadius: '5px',
            }}
        >
            <div className="container">
                {childData.map((dtEl, dtIdx) => {
                    return (
                        <TicketEditCustomerItem
                            canEdit={canEdit}
                            key={dtIdx}
                            data={dtEl}
                            onChange={changeQuantityHandler}
                        />
                    )
                })}
                <div className="row" style={{ gap: '15px' }}>
                    <button
                        className="btn btn-primary"
                        disabled={!canEdit}
                        onClick={saveHandler}
                    >
                        Lưu
                    </button>

                    <button
                        className="btn btn-primary"
                        disabled={false}
                        onClick={cancelHandler}
                    >
                        Hủy
                    </button>

                    <button
                        className="btn btn-primary"
                        disabled={false}
                        // onClick={() => setCanEdit(true)}
                        onClick={btnEditClickHandler}
                    >
                        Sửa
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TicketEditItem
