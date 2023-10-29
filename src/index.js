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
    <GoogleOAuthProvider clientId="891307349200-9khqe8cua5pvifevggim1mg6eg6a1cct.apps.googleusercontent.com">
      <Router>
      <App/>
      </Router>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
reportWebVitals();
