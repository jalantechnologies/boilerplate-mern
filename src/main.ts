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
