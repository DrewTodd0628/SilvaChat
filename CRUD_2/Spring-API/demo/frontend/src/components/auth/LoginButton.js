import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    
    return (
        !isAuthenticated && (
            <button className='btn waves-effect waves-light login-button' onClick={() => loginWithRedirect()}>Sign In</button>
        )
    )
}

export default LoginButton