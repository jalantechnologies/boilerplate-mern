import express, { Application } from 'express';
import bodyParser from 'body-parser';
import InspectletRouter from './inspectlet-router';
import ErrorHandler from '../../error/error-handler';

export default class InspectletRESTApiServer {
  public static async create(): Promise<Application> {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/wid', InspectletRouter.getRoutes());

    app.use(ErrorHandler.AppErrorHandler);

    return Promise.resolve(app);
  }
}
