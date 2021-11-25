import '@fontsource/roboto';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createTheme, ThemeProvider } from '@material-ui/core/';

import {
  Container,
  Box,
} from '@material-ui/core/';

import './App.scss';
// import { AccessibilityWidget } from 'react-accessibility';
import Header from './components/header';
import Hero from './components/hero';

import Home from './components/homePage';
import Profile from './components/profilePage';
import Places from './components/placesPage';
import { makeStyles } from '@material-ui/core/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      xxs: 0, // small phone
      xs: 300, // phone
      sm: 600, // tablets
      md: 900, // small laptop
      lg: 1200, // desktop
      xl: 1536 // large screens
    }
  },
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
    h1: {
      fontSize: '2.8rem',
    },
    h2: {
      fontSize: '2.5rem',
    },
    h3: {
      fontSize: '2.3rem',
    },
    h4: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.8rem',
    },
    h6: {
      fontSize: '1.4rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
   },
   body2: {
    fontWeight: 400,
    fontSize: '1rem',
  },
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
      {/* 
      <AccessibilityWidget/> */}
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
