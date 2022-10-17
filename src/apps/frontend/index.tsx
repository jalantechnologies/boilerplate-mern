import set from 'lodash/set';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.component';

// setting globally available config to window
// see webpack.base.js for injecting config
set(window, 'Config', Config);

document.addEventListener('DOMContentLoaded', () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  ReactDOM.render(<App />, document.getElementById('app'));
});
