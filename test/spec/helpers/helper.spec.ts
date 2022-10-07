import App from '../../../src/apps/backend/app';

export let app;

before(async () => {
  app = await App.startServer();
});
