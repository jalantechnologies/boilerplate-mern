import { Router } from 'express';
import TaskController from './task-controller';
import AccountAuthMiddleware from '../../access-token/rest-api/account-auth-middleware';
import TaskAccessMiddleware from './task-access-middleware';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router({ mergeParams: true });

    router.post('/', AccountAuthMiddleware.ensureAccess, TaskController.createTask);
    router.get('/', AccountAuthMiddleware.ensureAccess, TaskController.getAllTasks);
    router.get('/:id', AccountAuthMiddleware.ensureAccess, TaskAccessMiddleware.ensureTaskAccess, TaskController.getTask);
    router.delete('/:id', AccountAuthMiddleware.ensureAccess, TaskAccessMiddleware.ensureTaskAccess, TaskController.deleteTask);

    return router;
  }
}
