import express, { Application } from 'express';
import AccountRouter from './account-router';

export default class AccountRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();
    // This method is called at the time of app start to let
    // module initialize its resources

    // TODO: Create a mongoose connection that is exclusively available to
    // Task service so it can persist the data

    app.use('/accounts', AccountRouter.getRoutes());

    return Promise.resolve(app);
  }
}
