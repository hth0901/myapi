import React, { useEffect, useRef, useState } from 'react'
import { authenActions } from '../store/authen-slice'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { doLogin } from 'store/auth-actions'

const DUMMY_USER = [
    {
        username: 'host',
        password: 'Abc@12345',
        isEmp: true,
    },
    {
        username: 'testuser',
        password: 'Abc@123456',
        isEmp: false,
    },
]

const LoginPage = (props) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const usernameRef = useRef()
    const passwordRef = useRef()

    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState('')
    // const { login, isAuthenticated, errorMessage } = useAuth()
    const { isAuthenticated, errorMessage } = useSelector((state) => {
        return state.auth
    })

    const submitHandler = (evt) => {
        evt.preventDefault()
        // console.log('login');
        setIsLoading(true)
        const uname = usernameRef.current.value
        const pword = passwordRef.current.value

        if (uname.length === 0 || pword === 0) {
            alert('Tên đăng nhập hoặc mật khẩu không hợp lệ')
            return
        }

        try {
            dispatch(doLogin(uname, pword))
        } catch (e) {
            setMessage(e.message)
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home-page')
        }
    }, [isAuthenticated])

    return (
        <div className="login-section js-fullheight d-flex flex-column justify-content-center">
            <div className="container">
                <div
                    className="row text-center p-2"
                    style={{ justifyContent: 'center' }}
                >
                    <div className="col-sm-8 col-md-6 col-lg-4">
                        <div className="form-login">
                            <div className="text-center heading-section ftco-animate">
                                <h5 className="text-uppercase">Đăng nhập</h5>
                            </div>
                            <form
                                className="form text-center"
                                onSubmit={submitHandler}
                            >
                                <div className="form-group input-group-md">
                                    <label className="form-control-label">
                                        Email
                                    </label>
                                    <input
                                        className="form-control"
                                        id="email"
                                        aria-describedby="emailHelp"
                                        ref={usernameRef}
                                    />
                                </div>
                                <div className="form-group input-group-md">
                                    <label className="form-control-label">
                                        Mật khẩu
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        ref={passwordRef}
                                    />
                                </div>
                                <div className="forgot">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="remembercheck"
                                        />
                                        <label
                                            className="form-check-label"
                                            htmlFor="remembercheck"
                                        >
                                            Ghi nhớ tài khoản
                                        </label>
                                    </div>
                                    <a href="#" className="rememberpw">
                                        Quên mật khẩu?
                                    </a>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Đăng nhập
                                </button>

                                <div className="register">
                                    Bạn chưa có tài khoản?{' '}
                                    <a href="#" className="ml-1">
                                        Đăng ký
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
