/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import ValidationMiddleware from '../../common/validation-middleware';
import { CreateAccountParams } from '../types';

import AccountController from './account-controller';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post(
      '/',
      ValidationMiddleware.validate(CreateAccountParams),
      AccountController.createAccount,
    );

    return router;
  }
}
