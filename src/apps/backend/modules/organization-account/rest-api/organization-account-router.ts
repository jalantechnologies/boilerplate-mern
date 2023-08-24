/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import OrganizationAccountController from './organization-account-controller';

export default class OrganizationAccountRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', OrganizationAccountController.createOrganizationAccount);

    return router;
  }
}
