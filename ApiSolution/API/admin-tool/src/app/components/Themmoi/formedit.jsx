import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import { Button, Icon } from '@material-ui/core'
import 'date-fns'
import Test2 from 'app/views/banve/file-upload/file-upload2.component'
import FileUpload from 'app/views/banve/file-upload/file-upload.component'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from '../HtmlEditor/Editor'
import { Popup, Position } from 'devextreme-react/popup'
import VideoInput from 'app/components/VideoInput/VideoInput'
import 'app/components/VideoInput/Style.css'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
const BASE_URL = process.env.REACT_APP_URL

const FormEdit = (props) => {
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
    const [active,setActive] = useState(null);


    const handleSubmit = (event) => {
        const string2 =state.Content.replaceAll(/\<span.*?>/g,"");
        const string3 = string2.replaceAll(/style=".*?"/g,"");
        const string4 = string3.replaceAll("</span>","")
        const string5 =string4.replaceAll("undefined","")
        state.Content = string5;
        if(active){state.Active=true} else {state.Active=false}
        var data = new FormData()
        data.append('data', JSON.stringify(state))
        for (var i = 0; i <= newUserInfo.profileImages.length - 1; i++) {
            data.append('Files', newUserInfo.profileImages[i])
        }
        data.append('Videos', newUserInfo.video)
        //var data = JSON.stringify(state);
        var requestOptions = {
            method: 'put',
            body: data,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DiaDiem`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Ch???nh s???a ?????a ??i???m th??nh c??ng', 'success', 500)
                history('/admin-tool/quanlydiadiem')
            })
            .catch((error) => console.log('error', error))
    }

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value,
        })
    }

    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/DiaDiem/${id}`)
                setState({
                    Id: data.data.id,
                    Content: data.data.content,
                    ContentEn: data.data.contentEn,
                    Address: data.data.address,
                    Title: data.data.title,
                    TitleEn: data.data.titleEn,
                    ImageID: data.data.imageID,
                    Open_date: data.data.open_date,
                    VideoID: data.data.videoID,
                    Lattitude:data.data.lattitude,
                    Longtidute : data.data.longtidute,
                    Active : data.data.active
                })
                if(data.data.active===true)
                {setActive(true)} else {setActive(false)};
                const dataImg = await axios.get(
                    `${BASE_URL}/api/Image/danhsachimagetheodiadiem/${data.data.id}`
                )
                console.log("listImg",dataImg);
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
        TitleEn,
        Content,
        ContentEn,
        Address,
        Lattitude,
        Longtidute,
        
    } = state
    console.log("Content",Content);

    const callBackValue = (name, value) => {
        setState({ ...state, [name]: value })
    }
    const AlertImage = () => {
        setPopupVisible(false)
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
                    notify('??i???n ?????y ????? c??c tr?????ng', 'error', 2000)
                    return null
                }}
            >
                <div className="row">
                    <div className="col-md-6">
                        <SimpleCard title="Ch???nh s???a th??ng tin">
                            <TextValidator
                                className="mb-4 w-full"
                                label="T??n ?????a di???m"
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
                                errorMessages={['T??n ?????a ??i???m ??ang tr???ng']}
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="T??n ?????a di???m (Ti???ng Anh)"

                                onChange={handleChange}
                                type="text"
                                value={TitleEn || ''}
                                name="TitleEn"
                               
                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="?????a ch??? "
                                onChange={handleChange}
                                required={true}

                                type="text"
                                value={Address || ''}
                                name="Address"
                                validators={[
                                    'required',
                                    'minStringLength: 5',
                                    'maxStringLength: 100',
                                ]}
                                errorMessages={['?????a ch??? ??ang tr???ng']}
                            />
                             <TextValidator
                                className="mb-4 w-full"
                                label="Kinh ?????"
                                onChange={handleChange}
                                type="number"
                                value={Lattitude || ''}
                                name="Lattitude"
                                required={true}
                                errorMessages={['T???a ????? ?????a ??i???m ??ang tr???ng']}

                            />
                            <TextValidator
                                className="mb-4 w-full"
                                label="V?? ?????"
                                onChange={handleChange}
                                type="number"
                                value={Longtidute || ''}
                                name="Longtidute"
                                required={true}
                                errorMessages={['T???a ????? ?????a ??i???m ??ang tr???ng']}
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
                                label="S??? d???ng"
                            />
                        </SimpleCard>
                    </div>
                    <div className="col-md-6">
                        <SimpleCard title="Thay ?????i h??nh ???nh">
                            <FileUpload
                                accept=".jpg,.png,.jpeg"
                                label="(*?????nh d???ng .jpg/.png/.jpeg-K??ch th?????c < 1Mb)"
                                multiple
                                updateFilesCb={updateUploadedFiles}
                            />
                            <p>???nh ???? c?? s???n</p>

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
                    <div className="col-md-6" style={{ marginTop: '30px' }}>
                        <SimpleCard title="Video gi???i thi???u">
                            {video === '' ? (
                                <div>?????a ??i???m ch??a c?? video</div>
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
                        <SimpleCard title="Thay ?????i video">
                            <VideoInput
                                width={400}
                                height={300}
                                file={fileBack}
                            />
                        </SimpleCard>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '30px' }}>
                        <SimpleCard title="M?? t??? ?????a ??i???m">
                            <Editor
                                name="Content"
                                dataContent={Content}
                                valueChanged={callBackValue}
                            ></Editor>
                        </SimpleCard>
                    </div>
                    <div className="col-md-12" style={{ marginTop: '30px' }}>
                        <SimpleCard title="M?? t??? ?????a ??i???m(Ti???ng Anh)">
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
                    <span className="pl-2 capitalize">L??u l???i</span>
                </Button>
                <button type="button" className="btn btn-outline-danger" onClick={() => history(-1)}>
                    H???y
                    </button>
            </ValidatorForm>
            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={AlertImage}
                showCloseButton={true}
                showTitle={true}
                title="C???nh b??o"
                container=".dx-viewport"
                width={300}
                height={120}
            >
                <Position at="middle" my="center" of="" />
                Th??m m???i ???nh s??? x??a ???nh ???? c?? s???n !
            </Popup>
            
        </div>
    )
}

export default FormEdit
