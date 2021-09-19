import React from 'react'

import AddPlace from './addPlace';
import Places from './places';

import {
    Grid,
    Container,
} from '@material-ui/core/';

const placesPage = () => {
    return (
        <Grid container>
            <Grid item xs={12}>
                <Container maxWidth="lg">
                    <AddPlace />
                </Container>
            </Grid>
            <Grid item xs={12}>
                <Container maxWidth="md">
                    <Places /> 
                </Container>
            </Grid>
        </Grid>
    )
}

export default placesPage
