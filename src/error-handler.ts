import { ErrorRequestHandler } from 'express';
import Logger from './modules/logger/logger';

const serverErrorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const errorCode = err.code as string;
  const errorMessage = err.message as string;
  Logger.error(`Error: ${errorCode} ${errorMessage}`);
  const errorObj = {
    message: errorMessage,
  };
  res.status(err.statusCode).json(errorObj);
};

export default serverErrorHandler;
