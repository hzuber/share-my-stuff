import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import NavBar from './navBar.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><NavBar /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
