import { withAuthenticator } from '@aws-amplify/ui-react'
import './App.css';
import Header from './components/header';
import AddPlace from './components/addPlace';
import Places from './components/places';

const App = () => {
  return (
    <div className="App">
      <amplify-sign-out button-text="Sign Out"></amplify-sign-out>
      <Header />
      <AddPlace />
      <Places />
    </div>
  );
}

export default withAuthenticator(App)
