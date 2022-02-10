import express, { Application } from 'express';
import AccountRepository from '../internal/store/account-repository';
import AccountRouter from './account-router';

export default class AccountRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();

    AccountRepository.initDb();
    app.use('/accounts', AccountRouter.getRoutes());

    return Promise.resolve(app);
  }
}
