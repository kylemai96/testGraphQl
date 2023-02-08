import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

import { Amplify } from 'aws-amplify';

import config from './aws-exports'; //adding 
Amplify.configure(config); //configuring the Authenticator

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
