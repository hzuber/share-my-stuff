import React from 'react';
import ReactDOM from 'react-dom';
import LoginModal from './loginModal.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LoginModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
