import { Response, Request, NextFunction } from 'express';

import { HttpStatusCodes } from '../http';
import { Logger } from '../logger';

import { AppError } from './app-error';

export enum ErrorCodes {
  UNHANDLED_ERROR = 'SERVER_ERR_01',
}

export default class ErrorHandler {
  public static AppErrorHandler(
    error: AppError,
    _req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    Logger.error(error.toString());
    if (error instanceof AppError) {
      res.status(error.httpStatusCode).json(error.toJson());
    } else {
      const err = new AppError('Server encountered unexpected error');
      err.code = ErrorCodes.UNHANDLED_ERROR;
      err.httpStatusCode = HttpStatusCodes.SERVER_ERROR;

      res
        .status(err.httpStatusCode)
        .json(err.toJson());

      next(error);
    }
  }
}
