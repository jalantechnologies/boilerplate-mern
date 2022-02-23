import App from '../../../src/app';

export let app;

before(async () => {
  app = await App.startRESTApiServer();
});
