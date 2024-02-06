import bodyParser from 'body-parser';
import express, {
  Application, NextFunction, Request, Response,
} from 'express';

import { HttpStatusCodes } from '../http';
import { Logger } from '../logger';

import { ApplicationError } from './application-error';

export enum ApplicationServerErrorCodes {
  UNHANDLED_ERROR = 'SERVER_ERR_01',
}

export default abstract class ApplicationServer {
  readonly server: Application;

  constructor() {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.disable('x-powered-by');

    this.server = server;
    this.configure();

    server.use(this.handleError);
  }

  private handleError = (
    error: ApplicationError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    Logger.error(error.toString());
    if (error instanceof ApplicationError) {
      res.status(error.httpStatusCode).json(error.toJson());
    } else {
      const err = new ApplicationError('Server encountered unexpected error');
      err.code = ApplicationServerErrorCodes.UNHANDLED_ERROR;
      err.httpStatusCode = HttpStatusCodes.SERVER_ERROR;

      res
        .status(err.httpStatusCode)
        .json(err.toJson());

      next(error);
    }
  };

  protected abstract configure(): void;
}
