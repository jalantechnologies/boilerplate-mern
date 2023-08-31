import bodyParser from 'body-parser';
import express, { Application } from 'express';

import ErrorHandler from '../../error/error-handler';
import OrganizationAccountRepository from '../internal/store/organization-account-repository';

import OrganizationAccountRouter from './organization-account-router';

export default class OrganizationAccountRESTApiServer {
  public static async create(): Promise<Application> {
    await OrganizationAccountRepository.createDBConnection();

    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/organization-account', OrganizationAccountRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }
}
