import React from 'react';
import ReactDOM from 'react-dom';
import UserSearchPage from './userSearchPage.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserSearchPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});
