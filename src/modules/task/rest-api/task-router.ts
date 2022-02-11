import { Router } from 'express';
import TaskController from './task-controller';
import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    // TODO: Implement a middle ware to ensure the account associated
    // with the request can access this resource. The middle ware should
    // be created in AccessTokenService.
    router.post('/', AccountAuthMiddleware.ensureAccess, TaskController.createTask);
    router.get('/', AccountAuthMiddleware.ensureAccess, TaskController.getAllTasks);
    router.get('/:id', AccountAuthMiddleware.ensureAccess, TaskController.getTask);
    router.delete('/:id', AccountAuthMiddleware.ensureAccess, TaskController.deleteTask);

    return router;
  }
}
