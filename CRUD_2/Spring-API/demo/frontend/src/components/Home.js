import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import { useHistory } from 'react-router-dom';
import Chat from './Chat';
import SignupButton from './signup-button'
import './style/home.css'

const Home = () => {
    const { isAuthenticated } = useAuth0();
    const history = useHistory();
  return (
    <main>
        <h2>Welcome to SilvaChat</h2>
        <p>The one chat app to rule them all!</p>
        {isAuthenticated ? <button className="homeBtn btn btn-primary btn-block" onClick={history.push("/register")}>Continue to chat</button> : <SignupButton/>};
        
    </main>
  )
}

export default Home