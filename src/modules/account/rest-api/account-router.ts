/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import AccountController from './account-controller';
import ACCOUNT_ROUTES from './account-routes';

export default class AccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post(
      ACCOUNT_ROUTES.ACCOUNT_ROUTE_ROOT,
      AccountController.createAccount,
    );
    router.get(
      ACCOUNT_ROUTES.GET_BY_USERNAME,
      AccountController.getAccountByUsername,
    );

    return router;
  }
}
