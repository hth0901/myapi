import React from 'react'

import ReactDOM from 'react-dom'
import classes from './TicketErrorModal.module.css'

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onConfirm} />
}

const ModalOverlay = (props) => {
    return (
        <div
            className={classes['modal-bg']}
            style={{
                backgroundColor: `#E04141`,
            }}
        >
            <div className={classes['modal-content']}>
                <img className={classes['logo']} src="/images/popup_logo.png" />
                <div className={classes['qr-container']}>
                    <img
                        src="/images/error_icon.png"
                        className={classes['qr-image']}
                    />
                </div>

                <p className={classes['p-note']}>
                    Vé không tồn tại hoặc đã hết lượt sử dụng
                </p>

                <p className={classes['p-note']}>
                    Vui lòng liên hệ quầy vé để xử lý
                </p>
            </div>
        </div>
    )
}

const TicketErrorModal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onConfirm={props.onConfirm} />,
                document.getElementById('overlay-root')
            )}
        </React.Fragment>
    )
}

export default TicketErrorModal
