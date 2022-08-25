import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}))

const ChonDiaDiemSuKiens = (props) => {
    const classes = useStyles()
    const listdanhsach = props.danhsach;    
    const handleChange = (event, value) => {
        props.listChoose(value);

      };
     
      
    return (
        <div className={classes.root}>
            <Autocomplete
                multiple
                id="tags-standard"
                options={listdanhsach}
                getOptionLabel={(option) => option.title}
                onChange={handleChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Địa điểm"
                        placeholder="Chọn địa điểm"
                        fullWidth
                    />
                )}
            />
           
          
        </div>
    )
}

export default ChonDiaDiemSuKiens

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
