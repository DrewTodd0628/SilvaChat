import React from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

import Home from "./components/Home";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import UpdateUser from "./components/UpdateUser";
import Chat from "./components/Chat";
import NavBar from './components/nav-bar';
import user from './components/user';
import ProtectedRoute from './auth/protected-route';

function App(){

  const { isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading</div>;
  }

  return(
    <>
    <NavBar/>
    <Switch>
        <Route exact path="/" component={Home}/>
        {/* <Route path="/userList" element={<UserList/>}/>
        <Route path="/addUser" element={<AddUser/>}/>
        <Route path="/editUser/:id" element={<UpdateUser/>}/> */}
        <ProtectedRoute exact path="/chat" component={Chat}/>
        <ProtectedRoute exact path="/user" component={user}/>
    </Switch>
    </>
  )
}

export default App;