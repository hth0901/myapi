import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataGrid, {
    Column,
    Editing,
    Popup,
    Paging,
    RequiredRule,
    EmailRule,
    Lookup,
    PatternRule,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import notify from 'devextreme/ui/notify'
import { Button } from '@material-ui/core'
import TreeView from 'devextreme-react/tree-view'

import CheckBox from 'devextreme-react/check-box'
import SelectBox from 'devextreme-react/select-box'
import NumberBox from 'devextreme-react/number-box'
import Form, {
    SimpleItem,
    Item,
    Label,
    ButtonItem,
} from 'devextreme-react/form'

const BASE_URL = process.env.REACT_APP_URL

const Menu = (props) => {
    const [list, setList] = useState([])
    const [pickItem, setPickItem] = useState({})
    const [parentItem, setParentItem] = useState({})
    const [isActive, setIsActive] = useState(false)
    const [isAdminTool, setIsAdminTool] = useState('1')
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/Menu`)
                const h1 = []
                data.data.forEach((item) => {
                    if (item.parentID === 0) {
                        item.items = []
                        item.text = item.name
                        h1.push(item)
                    }
                })
                data.data.forEach((item) => {
                    if (item.parentID != 0) {
                        item.text = item.name
                        const index = h1.findIndex(
                            (item2) => item2.id == item.parentID
                        )
                        h1[index].items.push(item)
                    }
                })
                setList(h1)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const Submit = async () => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = await pickItem
        if (
            doituong.name === '' ||
            doituong.name === undefined ||
            doituong.path === '' ||
            doituong.path === undefined
        ) {
            notify('Không thành công', 'error', 500)
            return null
        }
        if (isActive) doituong.isActive = '1'
        else doituong.isActive = '0'
        doituong.isLeaf = '1'
        doituong.isAdminTool = isAdminTool
        var raw = JSON.stringify(doituong)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/Menu`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500)
                console.log('ve roi ')
            })
            .catch((error) => console.log('error', error))
    }
    const selectItem = (e) => {
        setPickItem(e.itemData)
        setParentItem(list.find((item) => item.id == e.itemData.parentID))
        if (e.itemData.isActive === '1') setIsActive(true)
        else setIsActive(false)
        setIsAdminTool(e.itemData.isAdminTool)
    }
    const valueChange = (e) => {
        setPickItem({ ...pickItem, [e.name]: e.value })
    }
    const changeActive = (e) => {
        setIsActive(e.value)
    }

    const changeTypeMenu = (e) => {
        setIsAdminTool(e.value ? '1' : '0')
    }

    const valueChange2 = (e) => {
        setParentItem(e.value)
        setPickItem({ ...pickItem, parentID: e.value.id })
    }
    const Delete = (e) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = pickItem
        if (doituong.id === undefined) {
            notify('Xóa không thành công', 'error', 500)
            return null
        }
        var raw = JSON.stringify(doituong)
        var requestOptions = {
            method: 'delete',
            headers: myHeaders,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/Menu/${doituong.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500)
                console.log('ve roi ')
            })
            .catch((error) => console.log('error', error))
    }
    console.log('pick item ', list)
    return (
        <div className="m-sm-30">
            <div className="row">
                <div className="col-md-4">
                    <SimpleCard title="Menu chức năng">
                        <div className="form">
                            <TreeView
                                id="simple-treeview"
                                items={list}
                                width={300}
                                onItemClick={selectItem}
                            />
                        </div>
                    </SimpleCard>
                </div>
                <div className="col-md-8">
                    <SimpleCard title="Chỉnh sửa menu">
                        <div id="form-demo">
                            <div className="widget-container">
                                <Form id="form" formData={pickItem}>
                                    <SimpleItem
                                        itemType="button"
                                        horizontalAlignment="left"
                                        cssClass="add-phone-button"
                                        buttonOptions={{
                                            icon: 'add',
                                            text: 'Thêm menu mới',
                                            onClick: () => {
                                                setPickItem({})
                                                setParentItem({})
                                            },
                                        }}
                                    ></SimpleItem>

                                    <SimpleItem
                                        dataField="name"
                                        name="name"
                                        isRequired={true}
                                        onValueChanged={valueChange}
                                    >
                                        <Label text="Tên menu" />
                                    </SimpleItem>
                                    <SimpleItem
                                        dataField="icon"
                                        name="icon"
                                        onValueChanged={valueChange}
                                    >
                                        <Label text="Icon hiển thị" />
                                    </SimpleItem>
                                    <SimpleItem
                                        dataField="path"
                                        name="path"
                                        isRequired={true}
                                        onValueChanged={valueChange}
                                    >
                                        <Label text="Đường dẫn" />
                                    </SimpleItem>
                                    {/* <SimpleItem
                            editorOptions={
                                {    mask: '(X)',
                                    maskRules: {
                                    X: /[02-9]/,
                                  },}
                            }
                            dataField='displayOrder'  name='displayOrder' onValueChanged={valueChange}>
                                <Label text='Order' />                              
                            </SimpleItem> */}
                                    <SimpleItem>
                                        <SelectBox
                                            name="parentID"
                                            displayExpr="name"
                                            displayValue="id"
                                            dataSource={list}
                                            value={parentItem}
                                            onValueChanged={valueChange2}
                                        />
                                        <Label text="Cấp cha" />
                                    </SimpleItem>
                                    <SimpleItem
                                        editorType="dxCheckBox"
                                        editorOptions={{
                                            value: isActive,
                                            onValueChanged: changeActive,
                                        }}
                                    >
                                        <Label text="Sử dụng" />
                                    </SimpleItem>

                                    <SimpleItem
                                        editorType="dxCheckBox"
                                        editorOptions={{
                                            value: isAdminTool === '1',
                                            onValueChanged: changeTypeMenu,
                                        }}
                                    >
                                        <Label text="Trang quản trị" />
                                    </SimpleItem>

                                    <SimpleItem
                                        itemType="button"
                                        horizontalAlignment="left"
                                        buttonOptions={{
                                            text: 'Lưu',
                                            type: 'success',
                                            useSubmitBehavior: true,
                                            onClick: () => {
                                                Submit()
                                            },
                                        }}
                                    />
                                    <SimpleItem
                                        itemType="button"
                                        horizontalAlignment="left"
                                        buttonOptions={{
                                            text: 'Xóa',
                                            type: 'error',
                                            useSubmitBehavior: true,
                                            onClick: () => {
                                                Delete()
                                            },
                                        }}
                                    />
                                </Form>
                            </div>
                        </div>
                    </SimpleCard>
                </div>
            </div>
        </div>
    )
}
export default Menu
