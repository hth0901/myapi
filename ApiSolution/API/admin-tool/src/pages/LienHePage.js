import React, { Fragment, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MainFooter from '../components/common/MainFooter'
import ErrorModal from '../components/UI/ErrorModal'

const BASE_URL = process.env.REACT_APP_URL

const LienHePage = (props) => {
    const formRef = useRef()
    const [mes, setMess] = useState('')

    const submitHandler = (evt) => {
        evt.preventDefault()
        const formData = {}
        ;[...formRef.current.elements].forEach((el) => {
            if (el.name) {
                formData[el.name] = el.value
            }
        })

        fetch(`${BASE_URL}/api/gopy/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                console.log(res)
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                console.log(data)
                if (data) {
                    setMess('Đã gửi yêu cầu thành công')
                } else {
                    throw new Error('Proccess Error')
                }
            })
            .catch((err) => {
                setMess(
                    'Gửi yêu cầu không thành công, xin liên hệ quản trị viên'
                )
            })
    }

    const onConfirm = (evt) => {
        setMess('')
    }

    return (
        <Fragment>
            {mes && (
                <ErrorModal
                    title="Thông báo"
                    message={mes}
                    onConfirm={onConfirm}
                />
            )}
            <nav
                className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light no-fix"
                id="ftco-navbar"
            >
                <div className="overlay-blur"></div>
                <div className="container-fluid">
                    {/* <a className="navbar-brand" href="index.html">
                        <img src="images/logo.svg" alt="img-fluid" />
                    </a> */}
                    <Link to={'/home-page'} className="navbar-brand">
                        <img src="images/logo.svg" alt="img-fluid" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#ftco-nav"
                        aria-controls="ftco-nav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="oi oi-menu"></span> Menu
                    </button>

                    <div className="collapse navbar-collapse" id="ftco-nav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home-page">
                                    trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/kham-pha">
                                    khám phá
                                </Link>
                            </li>
                            <li className="nav-item cta cta-outline">
                                <Link className="nav-link active" to="/lien-he">
                                    liên hệ
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <section className="ftco-section ftco-contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-md-12">
                            <div className="wrapper">
                                <div className="row no-gutters">
                                    <div className="col-md-7 d-flex align-items-stretch">
                                        <div className="contact-wrap p-md-5 p-4">
                                            <h6 className="mb-4 text-primary">
                                                Gửi liên hệ
                                            </h6>
                                            <div
                                                className="mb-4"
                                                style={{ display: 'none' }}
                                            ></div>
                                            <div
                                                className="mb-4"
                                                style={{ display: 'none' }}
                                            >
                                                Tin nhắn của bạn đã được gửi,
                                                cảm ơn bạn!
                                            </div>
                                            <form
                                                method="POST"
                                                id="contactForm"
                                                name="contactForm"
                                                noValidate={true}
                                                onSubmit={submitHandler}
                                                ref={formRef}
                                            >
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="fullName"
                                                                id="name"
                                                                placeholder="Họ và tên"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                name="email"
                                                                id="email"
                                                                placeholder="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                name="title"
                                                                id="subject"
                                                                placeholder="Tiêu đề"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <textarea
                                                                name="content"
                                                                className="form-control"
                                                                id="message"
                                                                cols="30"
                                                                rows="7"
                                                                placeholder="Nội dung"
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <input
                                                                type="submit"
                                                                value="Send Message"
                                                                className="btn btn-primary"
                                                            />
                                                            <div className="submitting"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-md-5 d-flex align-items-stretch">
                                        <div className="info-wrap bg-primary p-lg-5 p-4">
                                            <h6 className="mb-4 mt-md-4 text-white">
                                                Liên hệ
                                            </h6>
                                            <div className="dbox d-flex align-items-start">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="material-icons-outlined">
                                                        place
                                                    </span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Address:</span>{' '}
                                                        Tam Toà, 23 Tống Duy Tân
                                                        - Huế - Việt Nam
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="material-icons-outlined">
                                                        call
                                                    </span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Phone:</span>{' '}
                                                        <a href="tel://1234567920">
                                                            +(84).234.3523237
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="material-icons-outlined">
                                                        mail
                                                    </span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Email:</span>{' '}
                                                        <a href="mailto:huedisan@gmail.com">
                                                            huedisan@gmail.com
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="dbox d-flex align-items-center">
                                                <div className="icon d-flex align-items-center justify-content-center">
                                                    <span className="material-icons-outlined">
                                                        public
                                                    </span>
                                                </div>
                                                <div className="text pl-3">
                                                    <p>
                                                        <span>Website</span>{' '}
                                                        <a href="http://hueworldheritage.org.vn/">
                                                            hueworldheritage.org.vn
                                                        </a>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <MainFooter />
        </Fragment>
    )
}

export default LienHePage
