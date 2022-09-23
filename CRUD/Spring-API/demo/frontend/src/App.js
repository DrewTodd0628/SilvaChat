import React from 'react';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';
import MessagePageAuth from './components/MessagePageAuth';

class App extends React.Component {


  render() {
    return (
      <main className='column'>
        <LoginButton/>
        <LogoutButton/>
        <MessagePageAuth/>
      </main>
    )
  }
}

export default App;
