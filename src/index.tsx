import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import App from './App';
import './index.css';
import { 
    PublicClientApplication, 
    EventType, 
    EventMessage, 
    AuthenticationResult 
} from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: process.env.REACT_APP_MICROSOFT_CLIENTID,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_MICROSOFT_TENANTID}`,
        redirectUri: '/'
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                // console.log(message)
            },
            // logLevel: "Info",

        }
    }
})

pca.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload)  {
        const payload = event.payload as AuthenticationResult;
        const account = payload.account;
        // console.log(payload)
        pca.setActiveAccount(account)
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App msalInstancec={pca}/>
        </BrowserRouter>
    </React.StrictMode>
);
