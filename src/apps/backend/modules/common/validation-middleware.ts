/* eslint-disable no-void */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import BadRequest from './types';

export default class ValidationMiddleware {
  public static validate = (validationClass: any) => (
    (req: Request, _res: Response, next: NextFunction): void => {
      const temp = plainToInstance(validationClass, req.body);

      void validate(temp).then((errors) => {
        if (errors.length) {
          const errorMessages = errors.map((error) => Object.values(error.constraints)).join(', ');
          next(new BadRequest(errorMessages));
        } else {
          next();
        }
      });
    }
  );
}
