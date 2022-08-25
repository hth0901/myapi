import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import DataGrid, {
    Column,
    Editing,
    Paging,
    Pager,
    Button,
    Toolbar,
    Item,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { Icon } from '@material-ui/core'
import { SimpleCard } from 'app/components'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import notify from 'devextreme/ui/notify'
import Button2 from 'devextreme-react/button'
import ScrollView from 'devextreme-react/scroll-view';
import Editor from 'app/components/HtmlEditor/Editor'



const BASE_URL = process.env.REACT_APP_URL

const DaiNoi = (props) => {
    const history = useNavigate()
    async function editColum(e) {
        history(`${e.row.data.id}/chinhsua`)
    }
    //state paging
    const allowedPageSizes = [5, 10, 'all']
    const pageState = {
        displayMode: 'full',
        showPageSizeSelector: true,
        showInfo: true,
        showNavButtons: true,
    }
    // get lisst place api
    const [list, setList] = useState([])
    const [images, setImages] = useState([])
    const [info,setInfo] = useState({});
    const [detailVisible,setDetailVisible] = useState(false)
    const [avatar,setAvatar] = useState("")
    const [contentP,setContentP]=useState("")
    const OnClose2 = () => {
        setDetailVisible(false)
    }
    const onDetail = (e)=>{
        setAvatar(e.row.data.listImage[0])
        setInfo(e.row.data);
        setDetailVisible(true);
        setContentP(e.row.data.content);
    }
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/DaiNoi`)
                setList(data.data)
                const data2 = await axios.get(`${BASE_URL}/api/Image`)
                setImages(data2.data)              
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    //popup
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupValue, setPopupValue] = useState({})

    const onDelete = (e) => {
        setPopupValue(e.row.data)
        setPopupVisible(true)
    }
    const OnSubmit = () => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DaiNoi/${popupValue.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Xóa địa điểm thành công', 'success', 500)
                const filteredItems = list.filter((item) => item !== popupValue)
                setList(filteredItems)
                setPopupVisible(false)
            })
            .catch((error) => console.log('error', error))
    }
    const OnClose = () => {
        setPopupVisible(false)
    }
    const EditCell = (Cellvalue) => {
        const thisImage = images.find(
            (item) => item.id.toString() === Cellvalue.value.toString()
        )
        if (thisImage === undefined) {
            return null
        } else {
            const urlImage = thisImage.url.trim()
            return (
                <div>
                    <img
                        style={{
                            width: '120px',
                            height: '70px',
                            borderRadius: '6px',
                        }}
                        alt={urlImage}
                        src={`${BASE_URL}/upload/${urlImage}`}
                    />
                </div>
            )
        }
    }
    const cellContent = (value) => {
        //const StringContent = value.innerHtml();
        return (
            <div dangerouslySetInnerHTML={{ __html: value.displayValue }}></div>
        )
    }
    
    const addNew = ()=>{
        history("/admin-tool/quanlydainoi/themmoi");
    }
    const callBackValue = (name, value) => {
       
    }
    return (
        <div className='m-sm-30'>
        <div className='row'>
      <div className='col'>
        <div id="data-grid-demo">
        
            <SimpleCard title="Danh sách quản lý địa điểm trong đại nội">
                    <Button2
                        icon='add'
                        onClick={addNew}
                        text="Thêm mới"/>
                <DataGrid dataSource={list} keyExpr="id" sorting={false} showBorders={true} 
                >
                   
                    <Paging defaultPageSize={10} />
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        displayMode={pageState.displayMode}
                        showPageSizeSelector={pageState.showPageSizeSelector}
                        showInfo={pageState.showInfo}
                        showNavigationButtons={pageState.showNavButtons}
                    />
                    <Editing allowDeleting={true} useIcons={true}></Editing>
                    <Column dataField="id" caption="Mã ID" width={60} />
                    <Column
                        dataField="title"
                        caption="Tên địa điểm"
                        width={180}
                    />
                    {/* <Column
                        dataField="subTitle"
                        caption="Ghi chú"
                        width={150}
                    /> */}
                    <Column
                        dataField="content"
                        caption="Nội dung"
                        cellRender={cellContent}
                        width={400}
                    />
                   
                    <Column
                        dataField="imageID"
                        width={130}
                        cellRender={EditCell}
                        caption="Hình ảnh"
                    />
                     <Column
                        dataField="active"
                        width={80}
                        caption="Sử dụng"
                    />
                    <Column type="buttons" width={110}>
                    <Button
                            hint="Xem chi tiết"
                            icon="info"
                            onClick={onDetail}
                        ></Button>
                        <Button
                            hint="Chỉnh sửa nội dung"
                            icon="rename"
                            onClick={editColum}
                        />
                        <Button
                            hint="Xóa địa điểm này"
                            icon="clear"
                            onClick={onDelete}
                        ></Button>
                    </Column>                
                    <SearchPanel visible={true} highlightCaseSensitive={true} />

                        
                           
                       
                    
                    
                </DataGrid>
               
               
            </SimpleCard>

            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={false}
                title="Xóa dữ liệu này"
                container=".dx-viewport"
                width={300}
                height={120}
            >
                <Position at="middle" my="center" of="" />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="before"
                    options={{
                        icon: 'clear',
                        text: 'Xóa',
                        onClick: OnSubmit,
                    }}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'Hủy',
                        onClick: OnClose,
                    }}
                />
                 Xóa địa điểm trong Đại Nội:  {popupValue.title} ?
            </Popup>
            <Popup
                visible={detailVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={true}
                title={"Thông tin địa điểm: " +info.title}
                container=".dx-viewport"
                width={800}
                height={500}
                scroll={true}
            >
                 <ScrollView width='100%' height='100%'>
                 <Position at="middle" my="center" of="" />
                <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col" width={100}>Thông tin</th>
      <th scope="col">Dữ liệu</th>    
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Tên địa điểm</th>
      <td>{info.title}</td>
     
    </tr>
    
    <tr>
      <th scope="row">Mô tả</th>
      <td>
      <Editor
                                name="ContentEn"
                                valueChanged={callBackValue}
                                dataContent={contentP}
                            ></Editor>
         </td>    
    </tr>
    <tr>
      <th scope="row">Hình ảnh đại diện</th>
      <td>
      <img
                        style={{
                            width: '130px',
                            height: '100px',
                            borderRadius: '6px',
                        }}
                        alt={avatar}
                        src={`${BASE_URL}/upload/${avatar}`}
                    />
       </td>    
    </tr>
    <tr>
      <th scope="row">Kinh độ-Vĩ độ</th>
      <td>{info.latitude}-{info.longitude}</td>    
    </tr>
  </tbody>
</table>
         
                 </ScrollView>
                 <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'Hủy',
                        onClick: OnClose2,
                    }}
                />
            </Popup>
        </div>
        </div>
       </div>
        </div>
    )
}
export default DaiNoi