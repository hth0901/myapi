import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../HtmlEditor/Editor'
import { Popup, Position } from 'devextreme-react/popup'
import VideoInput from 'app/components/VideoInput/VideoInput'
import 'app/components/VideoInput/Style.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { KeyboardDateTimePicker } from '@material-ui/pickers'

const BASE_URL = process.env.REACT_APP_URL

const SuKienEdit = (props) => {
    const history = useNavigate()
    const { id } = useParams()

    //upload file
    const [newUserInfo, setNewUserInfo] = useState({
        profileImages: [],
    })

    const updateUploadedFiles = (files) => {
        setNewUserInfo({ ...newUserInfo, profileImages: files })
        if (files.length > 0) {
            setPopupVisible(true)
        }
    }

    //Basic
    const [state, setState] = useState({
        Open_date: new Date(),
    })
    const [image, setImage] = useState([])
    const [video, setVideo] = useState('')
    const [popupVisible, setPopupVisible] = useState(false)
    const [checkUse, setCheckUse] = useState(null);
    const [active,setActive] = useState(null);


    const handleSubmit = (event) => {
        const string2 =state.Content.replaceAll(/\<span.*?>/g,"");
        const string3 = string2.replaceAll(/style=".*?"/g,"");
        const string4 = string3.replaceAll("</span>","")
        const string5 =string4.replaceAll("undefined","")
        state.Content = string5;
        if(checkUse) {state.IsDaily = "1"} else {state.IsDaily="0"} 
        if(active){state.Active=true} else {state.Active=false}

        var data = new FormData()
        data.append('data', JSON.stringify(state))
        for (var i = 0; i <= newUserInfo.profileImages.length - 1; i++) {
            data.append('Files', newUserInfo.profileImages[i])
        }
        data.append('Videos', newUserInfo.video)
        //var data = JSON.stringify(state);
        var requestOptions = {
            method: 'PUT',
            body: data,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/SuKien`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Sửa sự kiện thành công', 'success', 500)
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
    // get lisst place api
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/SuKien/${id}`)
                console.log('url video o day ', data)
                setState({
                    Id: data.data.id,
                    Content: data.data.content,
                    Address: data.data.address,
                    Title: data.data.title,
                    ImageID: data.data.imageID,
                    Open_date: data.data.open_date,
                    VideoID: data.data.videoID,
                    Longtidute : data.data.longtidute,
                    Lattitude : data.data.lattitude,
                    Note: data.data.note,
                    EventTime : data.data.eventTime,
                    IsDaiLy : data.data.isDaily,
                    Active : data.data.active
                })
                if(data.data.isDaily==="1")
                {setCheckUse(true)} else {setCheckUse(false)};
                if(data.data.active===true)
                {setActive(true)} else {setActive(false)};

                const dataImg = await axios.get(
                    `${BASE_URL}/api/Image/danhsachimagetheosukien/${data.data.id}`
                )
                setImage(dataImg.data)
                const dataVideo = await axios.get(
                    `${BASE_URL}/api/Video/${data.data.videoID}`
                )
                setVideo(dataVideo.data.url)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [id])

    const {
        //imgage,
        Title,
        Content,
        Address,
        Lattitude,
        Longtidute,
        Note,
        EventTime,        
    } = state
    const callBackValue = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const AlertImage = () => {
        setPopupVisible(false)
    }
    const fileBack = (file) => {
        setNewUserInfo({ ...newUserInfo, video: file })
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
                    notify('Điền đầy đủ các trường', 'error', 2000)
                    return null
                }}
            >
                <div className="row">
                    <div className="col-md-6">
                        <SimpleCard title="Thay đổi sự kiện">
                            <TextValidator
                                className="mb-4 w-full"
                                label="Tên địa diểm"
                                onChange={handleChange}
                                type="text"
                                value={Title || ''}
                                name="Title"
                                required={true}

                                validators={[
                                    'required',
                                    'minStringLength: 10',
                                    'maxStringLength: 100',
                                ]}
                                errorMessages={['Tên sự kiên đang trống']}
                            />

                            <TextValidator
                                className="mb-4 w-full"
                                label="Địa chỉ"
                                onChange={handleChange}
                                type="text"
                                value={Address || ''}
                                required={true}

                                name="Address"
                                validators={[
                                    'required',
                                    'minStringLength: 10',
                                    'maxStringLength: 100',
                                ]}
                                errorMessages={['Địa chỉ hiện đang trống']}
                            />
                             <TextValidator
                                className="mb-4 w-full"
                                label="Kinh độ"
                                onChange={handleChange}
                                type="number"
                                value={Lattitude || ''}
                                required={true}

                                name="Lattitude"
                                errorMessages={['Tọa độ sự kiện đang trống']}

                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="Vĩ độ"
                                onChange={handleChange}
                                type="number"
                                required={true}

                                value={Longtidute || ''}
                                name="Longtidute"
                                errorMessages={['Tọa độ sự kiện đang trống']}

                            />
                            

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                                value={EventTime || ''}
                                name="EventTime"
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
                    <div className="col-md-6">
                        <SimpleCard title="Thay đổi hình ảnh">
                            <FileUpload
                                accept=".jpg,.png,.jpeg"
                                label="(*Định dạng .jpg/.png/.jpeg-Kích thước < 1Mb)"
                                multiple
                                updateFilesCb={updateUploadedFiles}
                            />
                            <p>Ảnh đã có sẵn</p>

                            <div>
                                
                                {image.map((item,i)=>
                                    
                                    <img
                                    style={{
                                        width: '20%',
                                        marginRight: '6px',
                                        borderRadius: '6px',
                                    }}
                                    src={`${BASE_URL}/upload/${item.url}`.trim()}
                                    alt={item.url}
                                    className="sc-jrQzAO iwhAAx"
                                />
                                    
                                    )}
                          
                        
                            </div>
                        </SimpleCard>
                    </div>
                    <div className="col-md-6" >
                        <SimpleCard title="Video giới thiệu">
                            {video === '' ? (
                                <div>Địa điểm chưa có video</div>
                            ) : (
                                <video
                                    controls
                                    className="VideoInput_video"
                                    width="100%"
                                >
                                    <source
                                        src={`${BASE_URL}/upload/${video}`.trim()}
                                    />
                                </video>
                            )}
                        </SimpleCard>
                    </div>
                    <div className="col-md-6" >
                        <SimpleCard title="Thay đổi video">
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
                </div>

                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Lưu lại</span>
                </Button>
                <button type="button" className="btn btn-outline-danger" onClick={() => history(-1)}>
                    Hủy
                    </button>
            </ValidatorForm>
            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={AlertImage}
                showCloseButton={true}
                showTitle={true}
                title="Cảnh báo"
                container=".dx-viewport"
                width={300}
                height={120}
            >
                <Position at="middle" my="center" of="" />
                Thêm mới ảnh sẽ xóa ảnh đã có sẵn !
            </Popup>
        </div>
    )
}

export default SuKienEdit
