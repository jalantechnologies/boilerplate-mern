import {
  ErrorRequestHandler, Response, Request, NextFunction,
} from 'express';
import AppError from './modules/app-error/app-error';
import Logger from './modules/logger/logger';

const serverErrorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const error = err as AppError;
  const errorString = error.toString();
  const errorJson = error.toJson();

  Logger.error(errorString);
  res.status(error.httpStatusCode).json(errorJson);
};

export default serverErrorHandler;
