import React, { useState } from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Icon } from '@material-ui/core'
import 'date-fns'
import FileUpload from 'app/views/banve/file-upload/file-upload.component'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import FormData from 'form-data'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { useNavigate } from 'react-router-dom'
import Editor from '../HtmlEditor/Editor'
import VideoInput from 'app/components/VideoInput/VideoInput'
import 'app/components/VideoInput/Style.css'
import TextField from '@mui/material/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { KeyboardDateTimePicker } from '@material-ui/pickers'



const BASE_URL = process.env.REACT_APP_URL
const SuKienAdd = () => {
    const history = useNavigate()

    //upload file
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: [],
    })

    const updateUploadedFiles = (files) =>
        setNewUserInfo({ ...newUserInfo, profileImages: files })
    //Basic
    const [state, setState] = useState({
        Open_date: new Date(),
    })
    const [checkUse, setCheckUse] = useState(null);
    const [active,setActive] = useState(null);
    const handleSubmit = (event) => {

        if (newUserInfo.profileImages.length === 0) {
            notify('Điền đầy đủ các trường và ảnh', 'error', 2000)
            return null
        }
        const string2 = state.Content.replaceAll(/\<span.*?>/g, "");
        const string3 = string2.replaceAll(/style=".*?"/g, "");
        const string4 = string3.replaceAll("</span>", "")
        const string5 = string4.replaceAll("undefined", "")
        state.Content = string5;
        if(checkUse) {state.IsDaily = "1"} else {state.IsDaily="0"}; 
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
        console.log("state trước gửi", state)
        // chiều làm cái này
        fetch(`${BASE_URL}/api/SuKien`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Thêm sự kiện thành công', 'success', 500)
                history('/admin-tool/quanlysukien')
            })
            .catch((error) => console.log('error', error))
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    const handleDateChange = (date) => {
        setState({ ...state, Open_date: date })
    }
    const fileBack = (file) => {
        setNewUserInfo({ ...newUserInfo, video: file })
    }

    const { Title, Content, Address, Lattitude, Longtidute, Note, eventTime } = state
    const callBackValue = (name, value) => {
        setState({ ...state, [name]: value })
    }

    const ChangeCheckUse = (event) => {
        setCheckUse(event.target.checked);
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
                        <SimpleCard title="Thêm mới sự kiện">
                            <TextValidator
                                className="mb-4 w-full"
                                label="Tên sự kiện"
                                required={true}

                                onChange={handleChange}
                                type="text"
                                value={Title || ''}
                                name="Title"
                                validators={[
                                    'required',
                                    'minStringLength: 5',
                                    'maxStringLength: 100',
                                ]}
                                errorMessages={['Tên sự kiện đang trống']}
                            />

                            <TextValidator
                                className="mb-4 w-full"
                                label="Địa chỉ"
                                onChange={handleChange}
                                type="text"
                                value={Address || ''}
                                name="Address"
                                required={true}

                                validators={[
                                    'required',
                                    'minStringLength: 10',
                                    'maxStringLength: 100',
                                ]}
                                errorMessages={['Địa chỉ sự kiện đang trống']}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Kinh độ"
                                onChange={handleChange}
                                type="number"
                                value={Lattitude || ''}
                                name="Lattitude"
                                required={true}
                                errorMessages={['Tọa độ sự kiện đang trống']}


                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Vĩ độ"
                                onChange={handleChange}
                                type="number"
                                value={Longtidute || ''}
                                name="Longtidute"
                                required={true}
                                errorMessages={['Tọa độ sự kiện đang trống']}


                            />
                          








                            <MuiPickersUtilsProvider
                            utils={DateFnsUtils}>
                                <KeyboardDateTimePicker
                                    className="mb-4 w-full"
                                    margin="none"
                                    id="mui-pickers-date"
                                    label="Ngày tổ chức"
                                    required={true}

                                    inputVariant="standard"
                                    type="text"
                                    autoOk={true}
                                    value={state.Open_date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                           
                            {/* <TextField
                                style={{ float: 'right' }}
                                id="time"
                                label="Giờ tổ chức"
                                type="time"
                                name='ThoiGian'
                                value={thoiGian||"00:00"}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                sx={{ width: 150 }}
                                onChange={setTimeString}
                            /> */}
                              <TextValidator
                                className="mb-4 w-full"
                                label="Ghi chú"
                                onChange={handleChange}
                                type="text"
                                value={Note || ''}
                                name="Note"
                            />
                             <TextValidator
                                className="mb-4 w-full"
                                label="Ghi chú thời gian"

                                onChange={handleChange}
                                type="text"
                                value={eventTime || ''}
                                name="eventTime"
                            />
                             <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checkUse||false}
                                        onChange={ChangeCheckUse}
                                        name='CheckUse'
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                }
                                label="Diễn ra hằng ngày"
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
                                label="(*Định dạng .jpg/.png/.jpeg-Kích thước < 1Mb)"
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
                        <SimpleCard title="Mô tả sự kiện">
                            <Editor
                                name="Content"
                                dataContent={Content}
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

export default SuKienAdd
