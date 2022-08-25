import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

import { Button, Icon } from '@material-ui/core'
import 'date-fns'
import FileUpload from 'app/views/banve/file-upload/file-upload.component'
import FormData from 'form-data'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { useNavigate } from 'react-router-dom'
import Editor from '../HtmlEditor/Editor'
import VideoInput from 'app/components/VideoInput/VideoInput'
import 'app/components/VideoInput/Style.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
const BASE_URL = process.env.REACT_APP_URL
const DaiNoiAdd = () => {
    const history = useNavigate()

    //upload file
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: [],
    })

    const updateUploadedFiles = (files) =>
        setNewUserInfo({ ...newUserInfo, profileImages: files })
    //Basic
    const [state, setState] = useState({})
    const [active,setActive] = useState(null);
    const handleSubmit = (event) => {
        if (newUserInfo.profileImages.length === 0) {
            notify('Điền đầy đủ các trường và ảnh', 'error', 2000)
            return null
        }

        const string2 =state.Content.replaceAll(/\<span.*?>/g,"");
        const string3 = string2.replaceAll(/style=".*?"/g,"");
        const string4 = string3.replaceAll("</span>","")
        const string5 =string4.replaceAll("undefined","")
        state.Content = string5;
        state.Longitude = state.Longtidute;
        state.Latitude=state.Lattitude;
        if(active){state.Active=true} else {state.Active=false}

        var data = new FormData()
        data.append('data', JSON.stringify(state))
        for (var i = 0; i <= newUserInfo.profileImages.length - 1; i++) {
            data.append('Files', newUserInfo.profileImages[i])
        }
        data.append('Videos', newUserInfo.video)

        //var data = JSON.stringify(state);
        var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DaiNoi`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Thêm địa điểm thành công', 'success', 500)
                history('/admin-tool/quanlydainoi')
            })
            .catch((error) => console.log('error', error))
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const {
        //imgage,
        Title,
        SubTitle,
        Content,
        TitleEn,
        SubTitleEn,
        ContentEn,
        Lattitude,
        Longtidute
    } = state
    const callBackValue = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const fileBack = (file) => {
        setNewUserInfo({ ...newUserInfo, video: file })
    }
    const ChangeActive = (event)=>{
        setActive(event.target.checked);
    }

    return (
        <div className="m-sm-30">
            <ValidatorForm
                onSubmit={handleSubmit}
                onError={() => {
                    notify('Điền đầy đủ các trường và ảnh', 'error', 2000)
                    return null
                }}
            >
                <div className="row">
                    <div className="col">
                        <SimpleCard title="Thêm mới địa điểm trong Đại Nội Huế">
                            <TextValidator
                                className="mb-4 w-full"
                                label="Tên địa diểm"
                                required={true}

                                onChange={handleChange}
                                type="text"
                                value={Title || ''}
                                name="Title"
                                validators={[
                                    'required',
                                    'minStringLength: 5',
                                    'maxStringLength: 50',
                                ]}
                                errorMessages={['Không để trống']}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Tên địa điểm (Tiếng Anh)"

                                onChange={handleChange}
                                type="text"
                                value={TitleEn || ''}
                                name="TitleEn"
                               
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Ghi chú"
                                onChange={handleChange}

                                type="text"
                                value={SubTitle || ''}
                                name="SubTitle"
                                validators={['maxStringLength: 100']}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Ghi chú (Tiếng Anh)"

                                onChange={handleChange}
                                type="text"
                                value={SubTitleEn || ''}
                                name="SubTitleEn"
                                validators={['maxStringLength: 100']}
                            />
                              <TextValidator
                                className="mb-4 w-full"
                                label="Kinh độ"
                                required={true}

                                onChange={handleChange}
                                type="number"
                                value={Lattitude || ''}
                                name="Lattitude"
                                errorMessages={['Không để trống']}

                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Vĩ độ"
                                required={true}

                                onChange={handleChange}
                                type="number"
                                value={Longtidute || ''}
                                name="Longtidute"
                                errorMessages={['Không để trống']}

                            />
                             <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={active||false}
                                        onChange={ChangeActive}
                                        name='CheckActive'
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                }
                                label="Sử dụng"
                            />
                        </SimpleCard>
                    </div>
                    <div className="col">
                        <SimpleCard title="Tải lên hình ảnh">
                            <FileUpload
                                accept=".jpg,.png,.jpeg"
                                label="(Định dạng .jpg/.png/.jpeg-Kích thước < 1Mb)"
                                multiple
                                updateFilesCb={updateUploadedFiles}
                            />
                        </SimpleCard>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '30px' }}>
                        <SimpleCard title="Tải lên video">
                            <VideoInput
                                width={400}
                                height={300}
                                file={fileBack}
                            />
                        </SimpleCard>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '30px' }}>
                        <SimpleCard title="Mô tả địa điểm">
                            <Editor
                                name="Content"
                                dataContent={Content}
                                valueChanged={callBackValue}
                            ></Editor>
                        </SimpleCard>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '30px' }}>
                        <SimpleCard title="Mô tả địa điểm(Tiếng Anh)">
                            <Editor
                                name="ContentEn"
                                dataContent={ContentEn}
                                valueChanged={callBackValue}
                            ></Editor>
                        </SimpleCard>
                    </div>
                </div>
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Lưu lại</span>
                </Button>
                <button type="button" className="btn btn-outline-danger" onClick={() => history(-1)}>
                    Hủy
                    </button>
            </ValidatorForm>
        </div>
    )
}

export default DaiNoiAdd
