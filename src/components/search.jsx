import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {
    Box,
    TextField,
    Typography,
    Select,
    FormControl,
    MenuItem,
    InputLabel,
} from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        width: '100%',
        background: '#397eac',
        padding: 20,
    },
    container: {
        width: 400,
        padding: 0,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    formField: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
        '& label': {
            color: 'white',
        },
        '& fieldset': {
            color: 'white',
            borderColor: 'white',
        }
    }
})


const Search = ({search, setSearch, sortByASC, sortByDESC}) => {
    const [AscValue, setASC] = useState('');
    const [DescValue, setDESC] = useState('');
    const classes = useStyles();

    const handleAscChange = (e) => {
        setASC(e.target.value)
        sortByASC(e.target.value)
      };

    const handleDescChange = (e) => {
        setDESC(e.target.value)
        sortByDESC(e.target.value)
    }

    return (
        <Box className={classes.root}>
            <Typography variant="body2">Filters:</Typography>
            <TextField
                className={classes.formField}
                label="Search Place"
                variant="outlined"
                color="primary"
                onChange={e => setSearch(e.target.value)}
                value={search}
                placeholder="Search Place..."
            />
            <Typography variant="body2">Sort By:</Typography>


   
            <FormControl fullWidth>
                <InputLabel id="asc-select">ASC</InputLabel>
                <Select
                labelId="asc-select"
                id="asc-select"
                value={AscValue}
                label="ASC"
                onChange={handleAscChange}
                >
                    <MenuItem value={"city"}>City</MenuItem>
                    <MenuItem value={"country"}>Country</MenuItem>
                    <MenuItem value={"dateVisitedFrom"}>Date Visited</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="desc-select">DESC</InputLabel>
                <Select
                labelId="desc-select"
                id="desc-select"
                value={DescValue}
                label="DESC"
                onChange={handleDescChange}
                >
                    <MenuItem value={"city"}>City</MenuItem>
                    <MenuItem value={"country"}>Country</MenuItem>
                    <MenuItem value={"dateVisitedFrom"}>Date Visited</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default Search
