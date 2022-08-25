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
import { useSelector } from 'react-redux'

const BASE_URL = process.env.REACT_APP_URL

const NguoiDung = (props) => {
    //state paging
    // get lisst place api
    const [list, setList] = useState([])

    const { arrRoles } = useSelector((state) => {
        return state.auth
    })
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/Employee`)
                setList(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    const updateting = async (e) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const doituong = await e.oldData

        const updateObj = {
            id: doituong.id,
            username: doituong.userName,
            password: doituong.passWord,
            roleid: doituong.roleId,
        }

        var raw = JSON.stringify(updateObj)

        // console.log(updateObj)
        // return
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/account/editaccount`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Chỉnh sửa thành công', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const inserting = (e) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        // const newUser = {
        //   FullName: state.username,
        //   RoleID: 8,
        //   UserName: state.email,
        //   PassWord: state.password
        // }
        var raw = JSON.stringify(e.data)

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/Account/register`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                const user = JSON.parse(result)
                if (user.token === undefined) {
                    notify('Thêm mới thất bại', 'error', 500)
                } else {
                    fetch(`${BASE_URL}/api/Employee`, requestOptions)
                        .then((response2) => response2.text())
                        .then((result2) => {
                            notify('Thêm mới thành công', 'success', 500)
                        })
                        .catch((error2) => console.log('error', error2))
                }
            })
            .catch((error) => console.log('error', error))
    }
    const removing = (e) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/Employee/${e.data.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Xóa thành công', 'success', 500)
            })
            .catch((error) => console.log('error', error))
    }
    const setColor = (value) => {
        if (value === 'Admin') return 'primary'
        if (value === 'Bán vé') return 'secondary'
        if (value === 'Soát vé') return 'default'
        if (value === 'Khách hàng') return 'default'
    }
    const buttonRole = (e) => {
        return (
            <Button
                style={{ width: '120px' }}
                variant="contained"
                color={setColor(e.displayValue)}
            >
                {e.displayValue}
            </Button>
        )
    }

    return (
        <div className="m-sm-30">
            <div className="row">
                <div className="col">
                    <div id="data-grid-demo">
                        <SimpleCard title="Quản lý người dùng">
                            <SearchPanel visible={true} />
                            <DataGrid
                                dataSource={list}
                                keyExpr="id"
                                showBorders={true}
                                onRowUpdating={updateting}
                                onRowRemoving={removing}
                                onRowInserting={inserting}
                            >
                                <Paging enabled={false} />
                                <Editing
                                    mode="popup"
                                    allowUpdating={true}
                                    allowDeleting={true}
                                    allowAdding={true}
                                    useIcons={true}
                                    texts={{
                                        confirmDeleteMessage:
                                            'Bạn muốn xóa dữ liệu này',
                                    }}
                                >
                                    <Popup
                                        title="Thông tin người dùng"
                                        showTitle={true}
                                        width={500}
                                        height={450}
                                    />
                                    <Form>
                                        <Item
                                            itemType="group"
                                            colCount={2}
                                            colSpan={2}
                                        >
                                            <Item
                                                dataField="displayname"
                                                colSpan={2}
                                            />
                                            <Item
                                                dataField="roleId"
                                                colSpan={2}
                                            />
                                            <Item
                                                dataField="userName"
                                                colSpan={2}
                                            />
                                            <Item
                                                dataField="passWord"
                                                colSpan={2}
                                            />
                                        </Item>
                                        {/* <Item itemType="group" colSpan={2}>
                                            <Item
                                                dataField="description"
                                                editorType="dxTextArea"
                                            />
                                        </Item> */}
                                    </Form>
                                </Editing>
                                {/* <Column
                                    dataField="id"
                                    caption="Mã ID"
                                    width={60}
                                /> */}
                                <Column
                                    dataField="displayname"
                                    caption="Tên đối tượng"
                                />
                                {/* <Column
                                    dataField="description"
                                    caption="Nội dung áp dụng"
                                /> */}
                                <Column
                                    dataField="userName"
                                    caption="Tên tài khoản"
                                    width={230}
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="passWord"
                                    caption="Mật khẩu"
                                    width={230}
                                    visible={false}
                                >
                                    <RequiredRule />
                                </Column>
                                <Column
                                    dataField="roleId"
                                    caption="Phân quyền"
                                    cellRender={buttonRole}
                                    width={150}
                                >
                                    <Lookup
                                        dataSource={arrRoles}
                                        valueExpr="id"
                                        displayExpr="roleName"
                                    />
                                    <RequiredRule />
                                </Column>
                                <Column
                    dataField="active"
                    caption='Sử dụng'
                    visible={false}
                    width={100}>,
                    
                       
                    </Column>
                            </DataGrid>
                        </SimpleCard>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NguoiDung

const RoleList = [
    {
        id: 9,
        name: 'Phục vụ',
    },
    {
        id: 8,
        name: 'Bán vé',
    },
    {
        id: 5,
        name: 'Admin',
    },
    {
        id: 7,
        name: 'Soát vé',
    },
]

// const RoleList = [
//   {
//     id:5,
//     name: "Admin"
//   },
//   {
//     id:7,
//     name: "Bán vé"
//   },
//   {
//     id:8,
//     name: "Soát vé"
//   },
//   {
//     id:9,
//     name: "Phục vụ"
//   }
// ]
