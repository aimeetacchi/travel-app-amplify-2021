import '@fontsource/roboto';
import { withAuthenticator } from '@aws-amplify/ui-react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/';

import {
  Container,
  Box,
} from '@material-ui/core/';

import './App.css';
import Header from './components/header';
import Home from './components/homePage';
import Profile from './components/profilePage';
import Places from './components/placesPage';
import { green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff8da1',
    },
    secondary: green
  },
  typography: {
    fontFamily: 'Lato',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightBold: 700,
  }
})


const useStyles = makeStyles({
  root: {
  }
})

const App = () => {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <amplify-sign-out button-text="Sign Out"></amplify-sign-out>
        <Box className={classes.root}>
          <Header />
          <Container maxWidth="lg">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/places" component={Places} />
            </Switch>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default withAuthenticator(App)
