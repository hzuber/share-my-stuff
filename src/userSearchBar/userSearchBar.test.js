import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import UserSearchBar from './userSearchBar.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const items = [ { id: 1, name: "Bitcoin" },
                  { id: 2, name: "Ethereum" },
                  { id: 3, name: "Litecoin" }]
  ReactDOM.render(<BrowserRouter><UserSearchBar allItems={items}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
