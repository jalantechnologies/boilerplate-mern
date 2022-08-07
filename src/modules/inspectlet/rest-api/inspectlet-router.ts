import { Router } from 'express';
import InspectletController from './inspectlet-controller';

export default class InspectletRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.get('/', InspectletController.getKey);

    return router;
  }
}
