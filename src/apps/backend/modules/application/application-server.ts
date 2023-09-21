import bodyParser from 'body-parser';
import express, { Application } from 'express';

import ErrorHandler from '../error/error-handler';

export default abstract class ApplicationServer {
  readonly server: Application;

  constructor() {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    server.disable('x-powered-by');

    this.server = server;
    this.configure();

    server.use(ErrorHandler.AppErrorHandler);
  }

  protected abstract configure(): void;
}
