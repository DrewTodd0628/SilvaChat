import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import configData from "./config.json";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import MessagePageAuth from "./components/MessagePageAuth";

// Known issues:
// Page constantly reloaded. Cause: Checks of logging in before browser gets a chance to finish processing request.
// Can't access data from API regardless of authentication status.

function App() {
  const {
    isLoading,
    error,
    isAuthenticated,
    user,
    getAccessTokenSilently,
    loginWithRedirect,
    logout,
  } = useAuth0();

  console.log("did you login?: " + isAuthenticated);

  const [accessToken, setAccessToken] = useState(null);
  const [apiResponseMessage, setAPIResponseMessage] = useState('');

  useEffect(() => {
    setAPIResponseMessage('');
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: configData.audience,
          scope: configData.scope,
        });
        setAccessToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, setAPIResponseMessage]);



  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    console.log("Logged out");
    return loginWithRedirect();
  }

  const securedAPITest = () => {
    fetch("http://localhost:8080/auth0/private", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .then(function (resJson) {
        console.log(resJson)
        setAPIResponseMessage(resJson.message);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Hi {user.email}, You have successfully logged in.</p>

        <button onClick={() => securedAPITest()}>Test Private API</button>
        {
          apiResponseMessage ? 
          <p>Response Message: {apiResponseMessage}</p> : ''
        }

        <button onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
        </button>
      </header>
       <LoginButton/>
       <LogoutButton/>
       <MessagePageAuth/>
    </div>
  );
}

export default App;

// import React from 'react';
// import LoginButton from './components/LoginButton';
// import LogoutButton from './components/LogoutButton';
// import MessagePageAuth from './components/MessagePageAuth';
// import { useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import configData from "./config.json";

// function App() {

//   const {
//     isLoading,
//     error,
//     isAuthenticated,
//     user,
//     getAccessTokenSilently,
//     loginWithRedirect,
//     logout,
//   } = useAuth0();

//   const [accessToken, setAccessToken] = useState(null);
//   const [apiResponseMessage, setAPIResponseMessage] = useState('');

//   // Generate access token and store to state variable
//   useEffect(() => {
//     setAPIResponseMessage('');
//     const getAccessToken = async () => {
//       try {
//         const accessToken = await getAccessTokenSilently({
//           audience: configData.audience,
//           scope: configData.scope,
//         });
//         console.log("Got token: " + accessToken);
//         setAccessToken(accessToken);
//       } catch (e) {
//         console.log(e.message);
//       }
//     };

//     getAccessToken();
//   }, [getAccessTokenSilently, setAPIResponseMessage]);

  
//   // Get current state
//   if (error) {
//     return <div>Oops... {error.message}</div>;
//   }

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (!isAuthenticated) {
//     return loginWithRedirect();
//   }

//   // API call with access token
//   const securedAPITest = () => {
//     fetch("http://localhost:8080/api/", {
//       method: "GET",
//       headers: new Headers({
//         Authorization: "Bearer " + accessToken,
//         "Content-Type": "application/json",
//       }),
//     })
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (resJson) {
//         console.log(resJson)
//         setAPIResponseMessage(resJson.message);
//       })
//       .catch((e) => console.log(e));
//   };

//     return (
//       <main className='column'>
//         <button onClick={() => securedAPITest()}>Test Private API</button>
//         <LoginButton/>
//         <LogoutButton/>
//         <MessagePageAuth/>
//       </main>
//     )
  
// }

// export default App;
