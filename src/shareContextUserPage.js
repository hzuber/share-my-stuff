import React from 'react';

const ShareContextUserPage = React.createContext({
    user: {},
    items: [],
    showLogin: false,
    showSignUp: false,
    addItemShowing: false,
    filter: 'no-filter',
    cardClicked: false,
    largeCardShowing: false,
    editCardShowing: false,
    updateItems: () => {},
    hideAddItem: () => {},
    showAddItem: () => {},
    handleAddToItems: () => {},
    handleDeleteItem: () => {},
    handleFilterChange: () => {},
    clickCard: () => {},
    unClick: () => {},
    showLargeCard: () => {},
    showEditCard: () => {},
    filterItems: () => {},
    updateEditedItem: () => {},
    
})

export default ShareContextUserPage