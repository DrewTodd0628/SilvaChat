import React from 'react';
import './style/nav.css';

import AuthNav from './auth-nav';
import { useHistory } from 'react-router-dom';

const NavBar = () => {
  const history = useHistory();

  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <h2 className='logo'>SilvaChat</h2>
          <div className='navButtons'>
            <button className='navBtn btn btn-primary'  onClick={() => {history.push("/chat")}}>Chat</button>
            <AuthNav />
          </div>
          
        </div>
      </nav>
    </div>
  );
};

export default NavBar;