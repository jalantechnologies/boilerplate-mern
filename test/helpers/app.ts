import { Server } from 'http';

import App from '../../src/apps/backend/app';

// eslint-disable-next-line import/no-mutable-exports
export let app: Server;

export const startApplication = async (): Promise<void> => {
  app = await App.startServer();
};

export const stopApplication = async (): Promise<void> => {
  if (!app) {
    throw new Error('Application could not be stopped - Application not started yet');
  }

  await new Promise<void>((resolve, reject) => {
    app.close((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
