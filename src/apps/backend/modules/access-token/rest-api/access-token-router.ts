/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';

import AccessTokenController from './access-token-controller';

export default class AccessTokenRouter {
  public static getRoutes(): Router {
    const router = Router();

    router.post('/', AccessTokenController.createAccessToken);

    return router;
  }
}
