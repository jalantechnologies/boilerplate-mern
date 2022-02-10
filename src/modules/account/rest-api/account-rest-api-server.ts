import express, { Application } from 'express';
import AccountRouter from './account-router';

export default class AccountRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();

    app.use('/accounts', AccountRouter.getRoutes());

    return Promise.resolve(app);
  }
}
