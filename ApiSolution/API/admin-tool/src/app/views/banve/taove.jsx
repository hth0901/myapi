import ChonDiaDiemSuKiens from 'app/components/TaoVe/DiaDiemSuKiens'
import { SimpleCard } from 'app/components'
import React, { useState, useEffect } from 'react'
import { ValidatorForm } from 'react-material-ui-form-validator'
import { Button, Icon, FormControlLabel, Checkbox } from '@material-ui/core'

import 'date-fns'
import FormGroup from '@material-ui/core/FormGroup'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
} from '@material-ui/core'
import axios from 'axios'
import notify from 'devextreme/ui/notify'
import { useNavigate } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field';


const API_URL = process.env.REACT_APP_URL

const TaoVe = () => {
    const history = useNavigate()

    //checkbox
    //simple
    const [state1, setState1] = React.useState({
        tour: true,
    })

    const handleChange1 = (name) => (event) => {
        setState1({ ...state1, [name]: event.target.checked })
    }
    //group
    const [state2, setState2] = React.useState({})
    const handleChange2 = (name) => (event) => {
        setState2({ ...state2, [name]: event.target.checked })
    }
    const [active,setActive] = useState(null);

    //const { adult, child, old } = state2
    const { tour } = state1
    const [listTypeTicket, setListType] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${API_URL}/api/LoaiVe`);
                setListType(data.data);
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])

    const [list, setList] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${API_URL}/api/DoiTuong`)
                setList(data.data)
                const check = {}
                data.data.forEach((item) => {
                    check[item.name] = true
                })
                setState2(check)
                const listPriceCheck = {}
                data.data.forEach((item) => {
                    listPriceCheck[item.id] = '0'
                })
                setPrice(listPriceCheck)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    // get lisst place api
    const [listPlace, setListPlace] = useState([])
    useEffect(() => {
        async function getList() {
            try {
                const data = await axios.get(`${API_URL}/api/DiaDiem`)
                setListPlace(data.data)
            } catch (err) {
                console.log(err.message)
            }
        }
        getList()
    }, [])
    //call back function
    const [listChoose, setListChoose] = useState([])
    const callBackFunction = (list) => {
        setListChoose(list)
    }
    const handleSubmit = () => {
        const data = {
            Name: '',
            Content: 'Vé tham quan ',
            Is_VeTuyen: tour,
            ListPlaceID: '',
            Active : active
        }
        const listPrice = []
        list.forEach((item) => {
            const check = { CustomerTypeID: null, Price: 0 }
            check.CustomerTypeID = item.id
            check.Price = price[item.id]
            if (typeof check.Price != 'undefined') {
                listPrice.push(check)
            }
        })
        listChoose.forEach((item) => {
            if (data.Name === '') data.Name = item.title
            else {
                data.Name = data.Name + '-' + item.title
            }
            data.Content = data.Content + data.Name
            if (data.ListPlaceID === '') data.ListPlaceID = item.id.toString()
            else data.ListPlaceID = `${data.ListPlaceID},${item.id}`
        })
        if (data.ListPlaceID === '') {
            notify('Địa điểm đang trống', 'error', 2000)
            return null
        }
        const checkFind = listTypeTicket.findIndex(e=> e.listPlaceID==data.ListPlaceID);
        if (checkFind != -1) {
            notify('Vé này đã tồn tại, xin chọn vé khác', 'error', 2000)
            return null
        }
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')

        const lastData = {
            Type: data,
            Price: listPrice,
        }
        var raw = JSON.stringify(lastData)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }
        fetch(`${API_URL}/api/LoaiVe`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                notify('Tạo loại vé thành công', 'success', 500)
                history('/admin-tool/quanlygiave')
            })
            .catch((error) => console.log('error', error))
    }
    const [price, setPrice] = useState({})

    const handleInput = (e,name) => {
        console.log(e);
        setPrice({ ...price, [name]: e })
    }
    const PlaceSingle = (e, value) => {
        const checkChoose = []
        checkChoose.push(value)
        setListChoose(checkChoose)
    }
    const ChangeActive = (event)=>{
        setActive(event.target.checked);
    }
    return (
        <div className="m-sm-30">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <div className="row">
                    <div className="col col-md-4">
                        <SimpleCard title="Loại vé">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={tour}
                                        onChange={handleChange1('tour')}
                                        value="tour"
                                        color="primary"
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                    />
                                }
                                label="Vé tour"
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
                        <SimpleCard title="Chọn địa điểm - Tour địa điểm">
                            {tour ? (
                                <ChonDiaDiemSuKiens
                                    danhsach={listPlace}
                                    listChoose={callBackFunction}
                                />
                            ) : (
                                <Autocomplete
                                    className="mb-4 w-300"
                                    options={listPlace}
                                    getOptionLabel={(option) => option.title}
                                    onChange={PlaceSingle}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Địa điểm - sự kiện"
                                            variant="outlined"
                                            fullWidth
                                        />
                                    )}
                                />
                            )}
                        </SimpleCard>
                    </div>
                    {/* <div className="col">
                        <SimpleCard title="Đối tượng áp dụng">
                            <FormGroup row>
                                {list.map((item, index) => {
                                    const checked = state2[item.name]
                                    return (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={checked || false}
                                                    onChange={handleChange2(
                                                        item.name
                                                    )}
                                                    value={item.name}
                                                />
                                            }
                                            label={item.name}
                                            key={index}
                                        />
                                    )
                                })}
                            </FormGroup>
                        </SimpleCard>
                    </div> */}
                </div>
                <div className="py-3" />
                <div className="row">
                   
                    <div className="col">
                        <SimpleCard title="Đối tượng áp dụng">
                            <Table className="whitespace-pre">
                                <TableHead>
                                    <TableRow>
                                        <TableCell className="px-0">
                                            Đối tượng
                                        </TableCell>
                                        <TableCell className="px-0">
                                            Giá(VND)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {list.map((item, index) => (
                                        <TableRow
                                            key={index}
                                            style={
                                                state2[item.name]
                                                    ? null
                                                    : { display: 'none' }
                                            }
                                        >
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                                {item.name}
                                            </TableCell>
                                            <TableCell
                                                className="px-0 capitalize"
                                                align="left"
                                            >
                                                <CurrencyInput
                                                    className="form-control"
                                                    name={item.id}
                                                    onValueChange={(e,name) =>
                                                        handleInput(e,name)
                                                    }
                                                    decimalSeparator="," 
                                                    groupSeparator="."
                                                    placeholder="0 VNĐ"
                                                    decimalsLimit={2}
                                                ></CurrencyInput>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </SimpleCard>
                    </div>
                </div>
                <div className="py-3" />
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

export default TaoVe
