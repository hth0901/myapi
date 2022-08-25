import React, { Fragment } from "react";
import ReactDOM from 'react-dom';

const LoadingPanelItem = (props) => {
    return (
        <div className="show fullscreen" style={{zIndex: '9999', position: 'fixed', top: '0', left: '0', width: '100%', height: '100vh'}}>
            <div className="content">
                <div className="loading">
                    {/* <p>Vui lòng chờ trong giây lát!!</p> */}
                    <span></span>
                </div>
            </div>
        </div>
    )
}

const LoadingPanel = (props) => {
    return <Fragment>        
        {ReactDOM.createPortal(<LoadingPanelItem />, document.getElementById('loadingPanel'))}
    </Fragment>
}

export default LoadingPanel;