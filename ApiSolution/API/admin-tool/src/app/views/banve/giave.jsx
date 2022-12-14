import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DataGrid, {
    Column,
    Paging,
    Pager,
    Button,
    SearchPanel,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import 'devextreme/dist/css/dx.light.css'
import { SimpleCard } from 'app/components'
import { useNavigate } from 'react-router-dom'
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup'
import notify from 'devextreme/ui/notify'
import Button2 from 'devextreme-react/button'


const BASE_URL = process.env.REACT_APP_URL

const GiaVe = (props) => {
    const history = useNavigate()

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
    const [listDoiTuong, setListDoiTuong] = useState([])
    const [listPrice, setListPrice] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${BASE_URL}/api/LoaiVe`)
                setList(data.data);
                console.log("data",data.data);
            } catch (err) {
                console.log(err.message)
            }
        }
        async function getListDoiTuong() {
            try {
                const data = await axios.get(`${BASE_URL}/api/DoiTuong`)
                setListDoiTuong(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        async function getListPrice() {
            try {
                const data = await axios.get(`${BASE_URL}/api/GiaVe`)
                setListPrice(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
        getListDoiTuong()
        getListPrice()
    }, [])
    if (list.length > 0) {
        list.forEach((item) => {
            const check = []
            listPrice.forEach((item2) => {
                if (item.id === item2.tiketTypeID) {
                    check.push(item2)
                }
            })
            check.forEach((item3) => {
                const checkDT = listDoiTuong.find(
                    (i) => i.id === item3.customerTypeID
                )
                if (
                    checkDT !== {} &&
                    checkDT !== null &&
                    checkDT !== [] &&
                    typeof checkDT !== 'undefined'
                )
                    item[checkDT.name] = item3.price
            })
        })
    }

    //popup
    const [popupVisible, setPopupVisible] = useState(false)
    const [popupValue, setPopupValue] = useState({})

    const onDelete = (e) => {
        setPopupValue(e.row.data)
        setPopupVisible(true)
    }
    const OnClose = () => {
        setPopupVisible(false)
    }
    const OnSubmit = () => {

        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow',
        }

        fetch(`${BASE_URL}/api/LoaiVe/${popupValue.id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('X??a th??nh c??ng', 'success', 500);
                setPopupVisible(false);

            })
            .catch((error) => console.log('error', error))

    }
    async function editColum(e) {
        history(`${e.row.data.id}/chinhsua`)
    }
    const addNew = ()=>{
        history("/admin-tool/quanlytaove");
    }
    console.log(list);
    return (
        <div className='m-sm-30'>
             <div className='row'>
           <div className='col'>
        <div id="data-grid-demo">
            <SimpleCard title="Danh s??ch v?? v?? gi?? ??ang b??n">
            <Button2
                                text='T???o v??'
                                icon='add'
                                onClick={addNew}/>
                <DataGrid dataSource={list} keyExpr="id" showBorders={true}>
                <SearchPanel visible={true} />
                    <Paging defaultPageSize={10} />
                    <Pager
                        visible={true}
                        allowedPageSizes={allowedPageSizes}
                        displayMode={pageState.displayMode}
                        showPageSizeSelector={pageState.showPageSizeSelector}
                        showInfo={pageState.showInfo}
                        showNavigationButtons={pageState.showNavButtons}
                    />

                    <Column dataField="id" caption="M?? ID" width={60} />
                    <Column dataField="name" caption="T??n ?????a ??i???m" />
                    <Column dataField="content" caption="N???i Dung" />
                    <Column dataField="active" caption="S??? d???ng" width={100}/>

                    <Column
                        dataField="is_VeTuyen"
                        caption="L?? v?? tuy???n"
                        width={100}
                    />
                    {listDoiTuong.map((item, index) => {
                        return (
                            <Column
                                key={index}
                                dataField={item.name}
                                width={100}
                                caption={item.name}
                                format="#,##0 VN??"
                            ></Column>
                        )
                    })}
                    <Column type="buttons" width={110}>
                        <Button
                            hint="Ch???nh s???a v??"
                            icon="rename"
                            onClick={editColum}
                        />
                        <Button
                            hint="X??a v??"
                            icon="clear"
                            onClick={onDelete}
                        ></Button>
                    </Column>
                </DataGrid>
            </SimpleCard>
            <Popup
                visible={popupVisible}
                dragEnabled={false}
                closeOnOutsideClick={false}
                showCloseButton={false}
                showTitle={false}
                title="X??a d??? li???u n??y"
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
                        text: 'X??a',
                        onClick: OnSubmit,
                    }}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={{
                        text: 'H???y',
                        onClick: OnClose,
                    }}
                />
                X??a d??? li???u n??y ?
            </Popup>
        </div>
        </div>
       </div>
        </div>
    )
}
export default GiaVe
