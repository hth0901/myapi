import BannerSlider from 'components/common/BannerSlider'
import MainHeader from 'components/MainHeader'
import React, { useState, useEffect, Fragment } from 'react'

import EventCart from 'components/sukien/EventCard'

const BASE_URL = process.env.REACT_APP_URL

const SuKienPage = (props) => {
    const [lstSuKien, setLstSuKien] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/api/sukien`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                setLstSuKien(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <Fragment>
            <MainHeader />
            <BannerSlider />
            <section className="ftco-section ftco-destination">
                <div className="container">
                    <div className="row">
                        <div className="col-12 search-section mb-40">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Điểm đến..."
                                    aria-label="Điểm đến..."
                                    aria-describedby="searchdestination"
                                />
                                <div className="input-group-append">
                                    <span
                                        className="input-group-text"
                                        id="searchdestination"
                                    >
                                        <i className="material-icons-outlined">
                                            search
                                        </i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {lstSuKien.map((el, idx) => {
                            return (
                                <EventCart
                                    id={el.id}
                                    key={idx}
                                    title={el.title}
                                    content={el.content}
                                    images={[...el.listImage]}
                                />
                            )
                        })}
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default SuKienPage
