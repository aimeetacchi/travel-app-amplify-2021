import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

import {
    Typography,
    Container,
    Box,
} from '@material-ui/core/';


const useStyles = makeStyles((theme) =>({
   root: {
       height: '70vh',
       [theme.breakpoints.up('md')]: {
           height: '60vh',
        },
   },
   heroContainer: {
    position: 'relative',
    height: '100%',
    padding: 0,
   },
   hero: {
       width: '100%',
       height: '100%',
       objectFit: 'cover',

   },
   heroContent: {
        position: 'absolute',
        top: '50%',
        zIndex: 1,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%',
        [theme.breakpoints.up('md')]: {
           width: 500,
        },
   }
}))

const Hero = () => {
    const classes = useStyles();
  
    return (
    <Box className={classes.root}>
        <Box className={classes.heroContainer}>
            <img className={classes.hero} src='https://dev.d36e3rz9n8j44b.amplifyapp.com/assets/images/hero001.jpg' alt="hero" />
            <Container maxWidth="md">
                <Box className={classes.heroContent}>
                    <Typography variant="h3" component="h1" align="center">Keep a collection of all the places you have travelled.</Typography>
                </Box>
            </Container> 
        </Box>
    </Box>
    )
}

export default Hero;
