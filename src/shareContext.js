import React from 'react';

const ShareContext = React.createContext({
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
    filter: "no-filter",
    addItemShowing: () => {},
    showAddItem : () => {},
    hideAddItem: () => {},
    handleFilterChange: () => {},
    runFilter:() => {}
})

export default ShareContext;