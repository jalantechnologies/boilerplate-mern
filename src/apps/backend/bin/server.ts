#!/usr/bin/env node
/* eslint-disable no-console */

import App from '../app';

console.log('www - attempting to start server...');
console.log('www - node env - %s', process.env.NODE_ENV);
console.log('www - config env - %s', process.env.NODE_CONFIG_ENV);

App.startServer()
  .then((server) => {
    console.log('www - server started listening on  - %s', server.address());
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
