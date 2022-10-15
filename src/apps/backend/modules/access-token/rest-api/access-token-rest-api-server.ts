import bodyParser from 'body-parser';
import express, { Application } from 'express';

import ErrorHandler from '../../error/error-handler';

import AccessTokenRouter from './access-token-router';

export default class AccessTokenRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/access-tokens', AccessTokenRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);
    return Promise.resolve(app);
  }
}
