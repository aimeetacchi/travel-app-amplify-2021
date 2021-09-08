import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {
    Box,
    TextField,
} from '@material-ui/core/';

const useStyles = makeStyles({
    root: {
        width: '100%',
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

const Search = ({search, setSearch}) => {
    const classes = useStyles();

    return (
        <Box>
             <TextField
                    className={classes.formField}
                    label="Search Place"
                    variant="outlined"
                    color="secondary"
                    onChange={e => setSearch(e.target.value)}
                    value={search}
                    placeholder="Search Place..."
                />
        </Box>
    )
}

export default Search
