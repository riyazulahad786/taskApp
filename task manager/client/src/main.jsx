import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Auth0Provider } from '@auth0/auth0-react';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastContainer />
        <GoogleOAuthProvider
        clientId="746990677113-4pv7og36hmuullq15ohe10h6v0oe7j6q.apps.googleusercontent.com"
        
        >
             <App />
        </GoogleOAuthProvider>
  </React.StrictMode>,
)
