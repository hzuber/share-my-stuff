import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import LoginModal from './loginModal.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><LoginModal /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
