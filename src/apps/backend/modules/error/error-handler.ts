import { Response, Request, NextFunction } from 'express';

import Logger from '../logger/logger';

import AppError from './app-error';

export default class ErrorHandler {
  public static AppErrorHandler(
    error: AppError,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) : void {
    Logger.error(error.toString());
    res.status(error.httpStatusCode).json(error.toJson());
  }
}
