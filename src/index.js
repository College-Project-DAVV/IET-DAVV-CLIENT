import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="697918735313-nd2tikionjqd2rtsastcke349h0u2al9.apps.googleusercontent.com">
      <Router>
     
      <App/>
     
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
