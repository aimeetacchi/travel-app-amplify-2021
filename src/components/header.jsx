import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import {
    Typography,
    Box,
    List,
    ListItem,
} from '@material-ui/core/';

const useStyles = makeStyles({
    navbar: {
        backgroundColor: 'rebeccaPurple',
        // marginTop: 20,
        marginBottom: 20,
        display: 'flex',
        justifyContent: 'center',
        color:'white',
        '& a': {
            color:'white',
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    },
    navitem: {
        width: 'auto',
    },
})

const Header = () => {
    const classes = useStyles();
    return (
        <Box>
            <List className={classes.navbar} component="nav">
                <ListItem className={classes.navitem} button><Link to="/">Home</Link></ListItem>
                <ListItem className={classes.navitem} button><Link to="/places">Places</Link></ListItem>
                <ListItem className={classes.navitem} button><Link to="/profile">Profile</Link></ListItem>
            </List>
            <Typography variant="h2" component="h1" align="center">Travel App</Typography>
            <Typography variant="body1" align="center">Keep a collection of all the places you have travelled.</Typography>
        </Box>
    )
}

export default Header
