import { Response, Request } from 'express';

import Logger from '../logger/logger';
import AppError from './app-error';

export default class ErrorHandler {
  public static AppErrorHandler(
    error: AppError,
    _req: Request,
    res: Response,
  ) : void {
    Logger.error(error.toString());
    res.status(error.httpStatusCode).json(error.toJson());
  }
}
