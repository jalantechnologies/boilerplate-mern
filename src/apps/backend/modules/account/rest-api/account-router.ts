/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccountController from './account-controller';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', AccountController.createAccount);

    return router;
  }
}
