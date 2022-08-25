import React, { Fragment, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Card from './Card'
import Button from './Button'
import classes from './TicketDetailModal.module.css'
import { useSelector } from 'react-redux'
import { toInteger } from 'lodash'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = (props) => {
    const { data, onAllowOne, onAllowAll, qrText } = props
    const { arrCustomerType } = useSelector((state) => state.common)
    let dkm = qrText
    dkm = dkm.replaceAll('<', '')
    dkm = dkm.replaceAll('>', '')
    const customerType = dkm.split('|')[2]
    const idTicket = dkm.split('|')[1]
    const curCustomerType = arrCustomerType.find(
        (el) => el.id === toInteger(customerType)
    )

    return (
        // <Card className={classes.modal}>
        //     <header className={classes.header} style={{textAlign: 'center'}}>
        //         <h5>Thông tin vé</h5>
        //     </header>
        //     <div className={classes.content}>
        //         <div className='row'>
        //             <div className="col">
        //                 <div className="total-ticket" style={{backgroundColor: 'transparent'}}>
        //                     <div className="price__total" style={{padding: '5px 10px 0px 10px', color: '#686868'}}>
        //                         <p><span>Họ và tên</span><br /><span className="price__nummber" style={{textAlign: 'left', marginLeft: '5px', fontSize: '15px'}}>{data.name}</span></p>
        //                     </div>
        //                     <div className="price__total" style={{padding: '5px 10px 0px 10px', color: '#686868'}}>
        //                         <p><span>Địa điểm</span><br /><span className="price__nummber" style={{textAlign: 'left', marginLeft: '5px', fontSize: '15px'}}>{data.placeName}</span></p>
        //                     </div>
        //                     <div className="price__total" style={{padding: '5px 10px 0px 10px', color: '#686868'}}>
        //                         <p><span>Số lượng</span><br /><span className="price__nummber" style={{textAlign: 'left', marginLeft: '5px', fontSize: '15px'}}>{data.items.join(", ")}</span></p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <footer className={classes.actions}>
        //         <Button onClick={onAllowOne}>Vào</Button>
        //         {data.totalQuantity > 1 && (<Fragment>&nbsp;&nbsp;&nbsp;<Button onClick={onAllowAll}>Vào tất cả</Button></Fragment>)}
        //     </footer>
        // </Card>
        <div
            className={classes['modal-bg']}
            style={{
                backgroundColor: `${
                    (curCustomerType &&
                        curCustomerType.colorCode &&
                        curCustomerType.colorCode) ||
                    '#fd813c'
                }`,
            }}
        >
            <div className={classes['modal-content']}>
                <img className={classes['logo']} src="/images/popup_logo.png" />
                <div className={classes['div-content']}>
                    <img
                        className={classes['img-bg']}
                        src="/images/bg_content.png"
                    />
                    <h4 className={classes['title']}>tham quan</h4>
                    <h4 className={classes['title-2']}>
                        {data.placeName || 'HOÀNG CUNG HUẾ'}
                    </h4>
                    <div className={classes['div-hr']}></div>
                    <div className={classes['info-content']}>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Vé:</p>
                            <p className={classes['p-value']}>
                                {data.customerTypeName}
                            </p>
                        </div>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Số lượng:</p>
                            <p className={classes['p-value']}>
                                {data.totalQuantity}
                            </p>
                        </div>
                        <div className={classes['info-content-detail']}>
                            <p className={classes['p-title']}>Khách:</p>
                            <p className={classes['p-value']}>{data.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TickdetDetailModal = (props) => {
    // useEffect(() => {
    //     const mTimeOut = setTimeout(() => {
    //         props.onConfirm()
    //     }, 5000)
    //     return () => {
    //         clearTimeout(mTimeOut)
    //     }
    // }, [])
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay
                    qrText={props.qrText}
                    data={props.data}
                    onConfirm={props.onConfirm}
                    onAllowOne={props.onAllowOne}
                    onAllowAll={props.onAllowAll}
                />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    )
}

export default TickdetDetailModal
