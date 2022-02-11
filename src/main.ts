/* eslint-disable no-console */

import assets from './asset.json';

function showTime() {
  console.log(Date().toLocaleString());
  console.log(assets.greetings);
}

function tick() {
  setTimeout(() => {
    showTime();
    tick();
  }, 1000);
}

tick();
import express from 'express';
import AccountServiceManager from './modules/account/account-service-manager';
import AccesstokenServiceManager from './modules/access-token/access-token-manager';
async function init() {
  const server = await AccesstokenServiceManager.createRestAPIServer();
  const s2 = await AccountServiceManager.createRestAPIServer();
  const app = express();
  app.use('/', server);
  app.use('/', s2);
  app.listen(3000, () => {
    console.log('Rest api server is running on port 3000');
  });
}

init();
