import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(2),
    },
}))
export default function LoaiVe() {
    //simple
    const [state, setState] = React.useState({
        tour: true,

    })

    const handleChange = (name) => (event) => {
        setState({ ...state, [name]: event.target.checked })
    }
    //group
    const classes = useStyles()
    const [state2, setState2] = React.useState({
        adult: true,
        child: false,
        old: false,
    })

    const handleChange2 = (name) => (event) => {
        setState2({ ...state, [name]: event.target.checked })
    }

    const { adult, child, old } = state2
    return (






        <div>
            
            <FormControlLabel
                control={
                    <Checkbox
                        checked={state.checkedA}
                        onChange={handleChange('checkedA')}
                        value="checkedB"
                        color="primary"
                        inputProps={{
                            'aria-label': 'secondary checkbox',
                        }}
                    />
                }
                label="Vé tour"
            />
            
           
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={adult}
                                onChange={handleChange2('adult')}
                                value="adult"
                            />
                        }
                        label="Người lớn"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={child}
                                onChange={handleChange2('child')}
                                value="child"
                            />
                        }
                        label="Trẻ em"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={old}
                                onChange={handleChange2('old')}
                                value="old"
                            />
                        }
                        label="Antoine Llorca"
                    />
                </FormGroup>
            </FormControl>
           
        </div>

    )
}
