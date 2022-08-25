import React, { useState, useEffect } from 'react'
import {
    Card,
    Checkbox,
    FormControlLabel,
    Grid,
    Button,
    CircularProgress,
} from '@material-ui/core'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

import { makeStyles } from '@material-ui/core/styles'
import history from 'history.js'
import clsx from 'clsx'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { doLogin } from 'store/auth-actions'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    cardHolder: {
        background: '#1A2038',
    },
    card: {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const JwtLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({
        email: ``,
        password: ``,
    })
    const [message, setMessage] = useState('')
    // const { login, isAuthenticated, errorMessage } = useAuth()
    const { isAuthenticated, errorMessage } = useSelector((state) => {
        return state.auth
    })

    const classes = useStyles()

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleFormSubmit = async (event) => {
        setLoading(true)
        try {
            // await login(userInfo.email, userInfo.password)
            // history.push('/')
            // await login(userInfo.email, userInfo.password)
            dispatch(doLogin(userInfo.email, userInfo.password))
        } catch (e) {
            setMessage(e.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin-tool')
        }
        // console.log(isAuthenticated)
    }, [isAuthenticated])

    useEffect(() => {
        setMessage(errorMessage)
        setLoading(false)
    }, [errorMessage])
    return (
        <div
            className={clsx(
                'flex justify-center items-center  min-h-full-screen',
                classes.cardHolder
            )}
        >
            <Card className={classes.card}>
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <div className="p-8 flex justify-center items-center h-full">
                            <img
                                className="w-200"
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </div>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <div className="p-8 h-full bg-light-gray relative">
                            <ValidatorForm onSubmit={handleFormSubmit}>
                                <TextValidator
                                    className="mb-6 w-full"
                                    variant="outlined"
                                    size="small"
                                    label="Tài khoản"
                                    onChange={handleChange}
                                    //type="email"
                                    name="email"
                                    value={userInfo.email}
                                    validators={['required']}
                                    errorMessages={[
                                        'Tài khoản email hiện đang trống',
                                        'Tài khoản email không đúng định dạng',
                                    ]}
                                />
                                <TextValidator
                                    className="mb-3 w-full"
                                    label="Mật khẩu"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={userInfo.password}
                                    validators={['required']}
                                    errorMessages={['Mật khẩu hiện đang trống']}
                                />
                                <FormControlLabel
                                    className="mb-3 min-w-288"
                                    name="agreement"
                                    onChange={handleChange}
                                    control={
                                        <Checkbox
                                            size="small"
                                            onChange={({
                                                target: { checked },
                                            }) =>
                                                handleChange({
                                                    target: {
                                                        name: 'agreement',
                                                        value: checked,
                                                    },
                                                })
                                            }
                                            checked={userInfo.agreement || true}
                                        />
                                    }
                                    label="Ghi nhớ đăng nhập"
                                />

                                {message && (
                                    <p className="text-error">{message}</p>
                                )}

                                <div className="flex flex-wrap items-center mb-4">
                                    <div className="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                        >
                                            Đăng nhập
                                        </Button>
                                        {loading && (
                                            <CircularProgress
                                                size={24}
                                                className={
                                                    classes.buttonProgress
                                                }
                                            />
                                        )}
                                    </div>
                                    <span className="mr-2 ml-5"> </span>
                                    {/* <Button
                                        variant="contained"
                                        color="default"
                                        className="capitalize"
                                        onClick={() =>
                                            history.push('/session/signup')
                                        }
                                    >
                                        Đăng ký
                                    </Button> */}
                                </div>
                                {/* <Button
                                    className="text-primary"
                                    onClick={() =>
                                        history.push('/session/forgot-password')
                                    }
                                >
                                    Quên mật khẩu
                                </Button> */}
                            </ValidatorForm>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </div>
    )
}

export default JwtLogin
