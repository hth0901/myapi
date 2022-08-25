import HtmlEditor from 'components/common/HtmlEditor'
import React, { Fragment } from 'react'
import BannerSliderTest from '../components/testpage/BannerSliderTest'

const MyPage = (props) => {
    return (
        <Fragment>
            {/* <BannerSliderTest /> */}
            <div className="test-div">
                <h3 className="abc">chi lạ ri</h3>
                <h4>dell dell</h4>
            </div>
            <HtmlEditor />
        </Fragment>
    )
}

export default MyPage
