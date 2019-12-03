import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import SignUpModal from './signupModal.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const location = '/signup'
  ReactDOM.render(<BrowserRouter><SignUpModal location={location}/></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
