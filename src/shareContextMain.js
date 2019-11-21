import React from 'react';

const ShareContextMain = React.createContext({
    users: [],
    items: [],
    error: null,
    setError: () => {},
    showLogin: false,
    showSignUp: false,
    newUserSignUp: () => {},
    showLoginFxn: () => {},
    hideLoginFxn: () => {},
    showSignUpFxn: () => {},
    hideSignUpFxn: () => {},
})

export default ShareContextMain;