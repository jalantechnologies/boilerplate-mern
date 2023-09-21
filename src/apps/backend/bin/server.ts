#!/usr/bin/env node
/* eslint-disable no-console */

import App from '../app';

App.startServer()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
