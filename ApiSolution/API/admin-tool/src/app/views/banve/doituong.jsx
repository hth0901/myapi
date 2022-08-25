import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    Pager,
    Form,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'

const BASE_URL = process.env.REACT_APP_URL

const DoiTuong = (props) => {
    //state paging
    // get lisst place api
    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/DoiTuong`)
                setList(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const updateting = (e) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = {
            ...e.oldData
        }
        if(e.newData.name!= undefined){
            doituong.name=e.newData.name;
        }
        if(e.newData.note!= undefined){
            doituong.note=e.newData.note;
        }
        var raw = JSON.stringify(doituong)
        var requestOptions = {
            method: 'Put',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        fetch(`${BASE_URL}/api/DoiTuong`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const inserting = (e) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        var raw = JSON.stringify(e.data)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DoiTuong`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Thêm mới thành công', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const removing = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/DoiTuong/${e.data.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Xóa thành công', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const allowedPageSizes = [5, 10, 'all']
    const pageState = {
        displayMode: 'full',
        showPageSizeSelector: true,
        showInfo: true,
        showNavButtons: true,
    }
    
    return (
        <div className='m-sm-30'>
             <div className='row'>
           <div className='col'>
           <div id="data-grid-demo">                
            <SimpleCard title="Quản trị đối tượng khách hàng" >  
                <SearchPanel visible={true} />                    
                <DataGrid
                    dataSource={list}
                    keyExpr="id"
                    showBorders={true}
                    onRowUpdating={updateting}
                    onRowInserting={inserting}
                    onRowRemoving={removing}
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
                    <Editing
                        mode="popup"
                        allowUpdating={true}
                        allowAdding={true}
                        allowDeleting={true}
                        useIcons={true}
                        texts ={
                            {confirmDeleteMessage:'Bạn muốn xóa dữ liệu này'}
                        }
                    >
                        <Popup
                            title="Thông tin đối tượng khách hàng"
                            showTitle={true}
                            width={600}
                            height={350}
                        />
                        <Form>
                            <Item itemType="group" colCount={2} colSpan={2}>
                                <Item dataField="name" colSpan={2} />
                                <Item
                                    dataField="note"
                                    colSpan={2}
                                    editorType="dxTextArea"
                                />
                            </Item>
                        </Form>
                    </Editing>
                    <Column dataField="id" caption="Mã ID" width={60} />                  
                    <Column
                        dataField="name"
                        caption="Tên đối tượng"
                        width={170}
                    />
                    <Column dataField="note" caption="Nội dung áp dụng" />
                </DataGrid>
            </SimpleCard>
        </div>
           </div>
       </div>
        </div>
      

        
    )
}
export default DoiTuong
