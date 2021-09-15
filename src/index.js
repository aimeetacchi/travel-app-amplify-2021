import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from "aws-amplify";
import awsExports from "./aws-exports";

import { Provider } from 'react-redux';
import store from './store';

Amplify.configure(awsExports);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root')
);
