import React from 'react'
import {useAuth0} from '@auth0/auth0-react';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import Home from "./Home";
import Chat from "./Chat";

const Routing = () => {
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <BrowserRouter>
            <Routes>
              <Route exact path="/" element ={<Home/>}/>
              <Route exact path="/chat" element={<Chat/>}/>
            </Routes>
            </BrowserRouter>
        )
    )
}

export default Routing