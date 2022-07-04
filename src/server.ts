import App from './app';

(() => {
  App.startServer().then(
    (server) => {
      // eslint-disable-next-line no-console
      console.log('Server is listening at ', server.address());
    },
    // eslint-disable-next-line no-console
    (e) => {
      console.error(e);
    },
  );
})();
