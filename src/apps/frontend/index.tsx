import React from 'react';
import ReactDOM from 'react-dom';
import set from 'lodash/set';

import App from './app';

// setting globally available config to window
// see webpack.base.js for injecting config
set(window, 'Config', Config);

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('app'));
});
