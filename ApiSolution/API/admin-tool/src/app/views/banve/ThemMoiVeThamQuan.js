import React, { useState, useEffect, useRef } from 'react'
import HtmlEditor from 'components/common/HtmlEditor'
import ChonDiaDiemSuKiens from '../../components/TaoVe/DiaDiemSuKiens'
import { SimpleCard } from '../../components'
import { ValidatorForm } from 'react-material-ui-form-validator'
import {
    Button,
    Icon,
    FormControlLabel,
    Checkbox,
    Radio,
    FormControl,
    RadioGroup,
    FormLabel,
} from '@material-ui/core'

import 'date-fns'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import notify from 'devextreme/ui/notify'
import { TagBox } from 'devextreme-react'
import { useNavigate } from 'react-router-dom'
import CurrencyInput from 'react-currency-input-field'

const API_URL = process.env.REACT_APP_URL

const ThemMoiVeThamQuan = (props) => {
    const [ticketTypeValue, setTicketTypeValue] = useState(1)
    const [listPlace, setListPlace] = useState([])
    const tagBoxRef = useRef()
    const handleSubmit = (evt) => {
        console.log(tagBoxRef.current)
    }

    const changeTypeHandler = (evt) => {
        setTicketTypeValue(+evt.currentTarget.value)
    }

    useEffect(() => {
        fetch(`${API_URL}/api/DiaDiem`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                console.log(data)
                setListPlace(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const tagboxchangehandler = (evt) => {
        console.log(evt)
    }
    return (
        <div className="m-sm-30">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <div className="row">
                    <div className="col col-md-4">
                        <SimpleCard title="Loại vé">
                            <FormControl>
                                <RadioGroup
                                    name="loaive"
                                    value={ticketTypeValue}
                                    onChange={changeTypeHandler}
                                >
                                    <FormControlLabel
                                        value={1}
                                        control={<Radio />}
                                        label="Ve don"
                                    />
                                    <FormControlLabel
                                        value={2}
                                        control={<Radio />}
                                        label="Ve tuyen"
                                    />
                                </RadioGroup>
                            </FormControl>
                        </SimpleCard>
                    </div>
                    <div className="col">
                        <SimpleCard title="Chọn địa điểm - Tour địa điểm">
                            {ticketTypeValue === 2 ? (
                                // <ChonDiaDiemSuKiens
                                //     danhsach={listPlace}
                                //     // listChoose={callBackFunction}
                                // />
                                <TagBox
                                    ref={tagBoxRef}
                                    items={listPlace}
                                    displayExpr="title"
                                    valueExpr="id"
                                    onChange={tagboxchangehandler}
                                />
                            ) : (
                                <Autocomplete
                                    className="mb-4 w-300"
                                    options={listPlace}
                                    getOptionLabel={(option) => option.title}
                                    // onChange={PlaceSingle}
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
                </div>
                <div className="py-3" />
                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <span className="pl-2 capitalize">Lưu lại</span>
                </Button>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    // onClick={() => history(-1)}
                >
                    Hủy
                </button>
            </ValidatorForm>
        </div>
    )
}

export default ThemMoiVeThamQuan
