import React from 'react';
import ReactDOM from 'react-dom';
import AddItem from './addItem.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddItem />, div);
  ReactDOM.unmountComponentAtNode(div);
});