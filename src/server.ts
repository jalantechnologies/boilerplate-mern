import { AddressInfo } from 'net';

import App from './app';

(() => {
  App.startServer().then(
    (server) => {
      // eslint-disable-next-line no-console
      console.log(
        'Server is listening on port: ',
        (server.address() as AddressInfo).port,
      );
    },
    (e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    },
  );
})();
