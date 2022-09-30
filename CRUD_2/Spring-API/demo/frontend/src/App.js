import React from 'react';
import {BrowserRouter, Routes,Route} from "react-router-dom";

import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import Chat from "./components/Chat";

import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import configData from "./config.json";
import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import MessagePageAuth from "./components/auth/MessagePageAuth";
import {IsNew} from "./components/NewUser";
import Routing from './components/Routing';
import './components/style/App.css';
import axios from 'axios';

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



  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (!isAuthenticated) {
  //   console.log("Logged out");
  //   return loginWithRedirect();
  // }

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
        {/* <p>Hi {user.email}, You have successfully logged in.</p> */}
        <LoginButton/>
       <LogoutButton/>
      </header>


      <div className="page">
       {/* <NewUser/> */}
       <Routing/>
       {IsNew()}
      </div>
    </div>
  );
}

export default App;

// function App(){
//   return(
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route exact path="/" element ={<Home/>}/>
//       {/* <Route path="/userList" element={<UserList/>}/>
//       <Route path="/addUser" element={<AddUser/>}/>
//       <Route path="/editUser/:id" element={<UpdateUser/>}/> */}
//       <Route exact path="/chat" element={<Chat/>}/>
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App;



// import React from 'react';
// import {BrowserRouter, Routes,Route} from "react-router-dom";

// import Home from "./components/Home";
// import AddUser from "./components/AddUser";
// import UserList from "./components/UserList";
// import UpdateUser from "./components/UpdateUser";
// import Chat from "./components/Chat";

// function App(){
//   return(
//     <>
//     <BrowserRouter>
//     <Routes>
//       <Route exact path="/" element ={<Home/>}/>
//       {/* <Route path="/userList" element={<UserList/>}/>
//       <Route path="/addUser" element={<AddUser/>}/>
//       <Route path="/editUser/:id" element={<UpdateUser/>}/> */}
//       <Route exact path="/chat" element={<Chat/>}/>
//     </Routes>
//     </BrowserRouter>
//     </>
//   )
// }

// export default App;