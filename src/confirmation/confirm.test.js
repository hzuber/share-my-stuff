import React from 'react';
import ReactDOM from 'react-dom';
import Confirm from './confirm.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Confirm />, div);
  ReactDOM.unmountComponentAtNode(div);
});