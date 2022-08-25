import React, { Fragment } from 'react'

import TicketErrorModal from 'components/UI/TicketErrorModal'

const TicketErrorPage = (props) => {
    return (
        <Fragment>
            <TicketErrorModal onConfirm={() => console.log('error close')} />
        </Fragment>
    )
}

export default TicketErrorPage
