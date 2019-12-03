import React from 'react';
import ReactDOM from 'react-dom';
import SignUpModal from './signupModal.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUpModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
