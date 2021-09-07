import React from 'react'

import AddPlace from './addPlace';
import Places from './places';

import {
    Grid,
} from '@material-ui/core/';

const placesPage = () => {
    return (
        <Grid container>
            <Grid item xs={12} md={6} lg={4}>
                <AddPlace />
            </Grid>
            <Grid item xs={12} md={6} lg={8}>
                <Places /> 
            </Grid>
        </Grid>
    )
}

export default placesPage
