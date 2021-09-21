import '@fontsource/roboto';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/';

import {
  Container,
  Box,
} from '@material-ui/core/';

import './App.css';
import Header from './components/header';
import Hero from './components/hero';

import Home from './components/homePage';
import Profile from './components/profilePage';
import Places from './components/placesPage';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#38A3A5',
    },
    secondary: {
      main: '#22577A'
    }
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
        <Box className={classes.root}>
          <Header />
          <Hero />
          <Container maxWidth="lg">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/profile/" component={Profile} />
              <Route path="/places/" component={Places} />
            </Switch>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
