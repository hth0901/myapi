import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Form,
    RequiredRule,
    EmailRule,
    Lookup,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { Button } from '@material-ui/core'

const BASE_URL = process.env.REACT_APP_URL

const FeedBack = (props) => {
    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/FeedBack`)
                console.log("data",data);
                setList(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const updateting = async (e) => {
        console.log(e);
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = await e.oldData

        var raw = JSON.stringify(doituong)
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/FeedBack`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500)
                console.log("ve roi ");
            })
            .catch((error) => console.log('error', error))
    }  
    
    return (
        <div className='m-sm-30'>
        <div className='row'>
      <div className='col'>
        <div id="data-grid-demo">
            <SimpleCard title="Danh sách Ý kiến người dùng">
                
                <DataGrid
                    dataSource={list}
                    keyExpr="id"
                    showBorders={true}
                    onRowUpdating={updateting}                   
                >
                    <SearchPanel visible={true} />
                    <Paging enabled={false} />
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                        useIcons={true}
                    >
                        <Popup
                            title="Chi tiết ý kiến người dùng"
                            showTitle={true}
                            width={700}
                            height={500}
                        />
                        <Form>
                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="fullName" disabled={true} colSpan={2} />
                                <Item dataField="title" disabled={true} colSpan={2} />
                                <Item dataField="email" disabled={true} colSpan={2} />
                                <Item dataField="isReply" colSpan={2} />
                            </Item>
                            <Item itemType="group" colSpan={2}>
                                <Item
                                    dataField="content"
                                    editorType="dxTextArea"
                                />
                            </Item>
                        </Form>
                    </Editing>
                    <Column dataField="id" caption="Mã ID" width={60} />
                    <Column
                        dataField="fullName"
                        caption="Tên người dùng"
                        width={170}
                    />
                     <Column
                        dataField="email"
                        caption="Email"
                        width={170}
                        visible = {true}
                    />
                     <Column
                        dataField="title"
                        caption="Tiêu đề"
                        width={170}
                    />
                    <Column
                        dataField="content"
                        caption="Nội dung"
                        width={300}
                    />                  
                    <Column
                        dataField="isReply"
                        caption="Phản hồi"                        
                        width={150}
                    >
                        <Lookup
                            dataSource={TrueFalse}
                            valueExpr="id"
                            displayExpr="name"
                        />
                    </Column>                                     
                </DataGrid>
            </SimpleCard>          
        </div>
            </div>
            </div>
             </div>
    )
}
export default FeedBack

const TrueFalse = [
    {
        id: '1',
        name: 'Đã trả lời',
    },
    {
        id: '2',
        name: 'Chưa trả lời',
    },
]