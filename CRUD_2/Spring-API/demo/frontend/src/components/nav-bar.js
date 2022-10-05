import React from 'react';
import './style/nav.css';

import AuthNav from './auth-nav';

const NavBar = () => {
  return (
    <div className="nav-container mb-3">
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="container">
          <div className="navbar-brand logo" />
          <h2 className='logo'>SilvaChat</h2>
          <AuthNav />
          
        </div>
      </nav>
    </div>
  );
};

export default NavBar;