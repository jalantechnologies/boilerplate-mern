import express, { Application } from 'express';
import bodyParser from 'body-parser';
import AccountRouter from './account-router';
import AccountRepository from '../internal/store/account-repository';
import ErrorHandler from '../../error/error-handler';

export default class AccountRESTApiServer {
  public static async create(): Promise<Application> {
    await AccountRepository.createDBConnection();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/accounts', AccountRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }
}
