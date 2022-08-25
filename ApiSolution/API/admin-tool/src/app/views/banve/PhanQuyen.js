import React, { useEffect, useState } from 'react'
import axios from 'axios'
import DataGrid, {
    ButtonItem,
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


import { useSelector, useDispatch } from 'react-redux'

import CheckBox from 'devextreme-react/check-box'
import SelectBox from 'devextreme-react/select-box'
import NumberBox from 'devextreme-react/number-box'
import Form, { Item, Label } from 'devextreme-react/form'

const BASE_URL = process.env.REACT_APP_URL

const PhanQuyen = (props) => {
    const [treeData, setTreeData] = useState([])
    const [gridData, setGridData] = useState([])
    const [selectedNode, setSelectedNode] = useState(null)
    const [isLeaf, setIsLeaf] = useState('0')

    const { arrRoles } = useSelector((state) => {
        return state.auth
    })

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
                setTreeData(h1)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])

    const selectTreeItemHandler = (evt) => {
        const { itemData } = evt
        setSelectedNode(itemData.id)
        // console.log(itemData)
        if (itemData.isLeaf === '1') {
            fetch(
                `${BASE_URL}/api/Account/danhsachvaitrotheomenu/${itemData.id}`
            )
                .then((res) => {
                    return res.json()
                })
                .then((data) => {
                    setGridData(data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            setGridData([])
        }
        setIsLeaf(itemData.isLeaf)
    }

    const insertHandler = (evt) => {
        console.log(evt)
        console.log(selectedNode)
        const rawData = {
            id: 0,
            menuId: selectedNode,
            roleId: evt.data.roleId,
            username: null,
            isAuthorize: '1',
        }

        // console.log(rawData)
        // return

        fetch(`${BASE_URL}/api/Account/themphanquyen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rawData),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }

                return res.json()
            })
            .then((data) => {
                if (data === 0) {
                    throw new Error('Thêm mới không thành công')
                }

                return fetch(
                    `${BASE_URL}/api/Account/danhsachvaitrotheomenu/${selectedNode}`
                )
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setGridData(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    const deleteHandler = (evt) => {
        const { data: dataDelete } = evt
        const { id: deleteId } = dataDelete

        fetch(`${BASE_URL}/api/Account/xoaphanquyen/${deleteId}`, {
            method: 'DELETE',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Proccess Error')
                }
                return res.json()
            })
            .then((data) => {
                if (data === 0) {
                    throw new Error(
                        'Xoa không thành công, liên hệ quản trị viên!'
                    )
                }
                return fetch(
                    `${BASE_URL}/api/Account/danhsachvaitrotheomenu/${selectedNode}`
                )
            })
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setGridData(data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <div className='m-sm-30'>
           
            <div className="row">
            <div className="col-md-4">
                <SimpleCard title='Menu chức năng'>
                <div className="form">
                    <TreeView
                        id="simple-treeview"
                        items={treeData}
                        width={300}
                        onItemClick={selectTreeItemHandler}
                    />
                </div>
                </SimpleCard>
                
            </div>
            <div className="col-md-6">
            <SimpleCard title='Chỉnh sửa phân quyền'>
            {isLeaf === '1' && (
                    <div className="row">
                        <DataGrid
                            dataSource={gridData}
                            showBorders={true}
                            onRowInserting={insertHandler}
                            onRowRemoving={deleteHandler}
                        >
                            <Paging enabled={false} />
                            <Editing
                                mode="row"
                                allowAdding={true}
                                allowDeleting={true}
                                useIcons={true}
                                texts ={
                                    {confirmDeleteMessage:'Bạn muốn xóa dữ liệu này'}
                                }
                            ></Editing>
                            <Column dataField={'roleId'} caption="Tên nhóm">
                                <Lookup
                                    dataSource={arrRoles}
                                    displayExpr="roleName"
                                    valueExpr="id"
                                />
                            </Column>
                        </DataGrid>
                    </div>
                )}
                </SimpleCard>
               
            </div>
        </div>
      
        </div>
    )
}

export default PhanQuyen
