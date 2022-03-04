import App from './app';

(() => {
  App.startServer().then(
    () => { },
    // eslint-disable-next-line no-console
    (e) => { console.error(e); },
  );
})();
