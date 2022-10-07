#!/usr/bin/env node

import App from '../app';

(() => {
  App.startServer().then(
    () => {
    },
    (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    },
  );
})();
