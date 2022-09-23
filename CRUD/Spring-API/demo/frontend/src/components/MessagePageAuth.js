import {useAuth0} from '@auth0/auth0-react';
import React from 'react';
import MessagePage from './MessagePage';

const MessagesPageAuth = () => {
    const { user, isAuthenticated } = useAuth0();
    
    return (
        isAuthenticated && (
            <MessagePage/>
        )
    )
}

export default MessagesPageAuth