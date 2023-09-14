import { Response, Request, NextFunction } from 'express';

import Logger from '../logger/logger';

import AppError from './app-error';

export default class ErrorHandler {
  public static AppErrorHandler(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    Logger.error(error.toString());

    if (error instanceof AppError) {
      res.status(error.httpStatusCode).json(error.toJson());
    } else {
      // always print stack for unhandled exceptions
      Logger.error(error.stack);

      res.status(500).json(error);
      next(error);
    }
  }
}
