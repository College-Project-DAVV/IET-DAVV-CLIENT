import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { BrowserRouter as Router } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <Router>
     
      <App/>
     
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
