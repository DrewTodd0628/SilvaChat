import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';
import configData from "./config.json";

// Get auth0 details stored in /src/config.json
const providerConfig = {
  domain: configData.domain,
  clientId: configData.clientId,
  audience: configData.audience,
  redirectUri: window.location.origin,
  useRefreshTokens: true,
  cacheLocation: "localstorage"
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
  </React.StrictMode>
);



// import React from "react";
// import ReactDOM from "react-dom";
// //import "./index.css";
// import App from "./App";
// //import { CookiesProvider } from 'react-cookie';

// ReactDOM.render(
//   <React.StrictMode>
//       <App/>
//   </React.StrictMode>,
//   document.getElementById("root")
// );