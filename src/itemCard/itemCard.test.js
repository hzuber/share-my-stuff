import React from 'react';
import ReactDOM from 'react-dom';
import ItemCard from './itemCard.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ItemCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});