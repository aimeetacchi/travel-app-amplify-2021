import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {
    Typography,
    Container,
    Box,
} from '@material-ui/core/';


const useStyles = makeStyles({
   root: {
       border: '1px solid red',
   }
})

const Hero = () => {
    const classes = useStyles();
  
    return (
        <Box p={4} className={classes.root}>
            <Container maxWidth="md">
                <Typography variant="body1" align="center">Keep a collection of all the places you have travelled.</Typography>
            </Container>  
        </Box>
    )
}

export default Hero;
