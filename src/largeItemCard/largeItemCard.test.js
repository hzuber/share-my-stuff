import React from 'react';
import ReactDOM from 'react-dom';
import LargeItemCard from './largeItemCard.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LargeItemCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});