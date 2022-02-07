import { Router } from 'express';
import TaskController from './task-controller';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router();

    // TODO: Implement a middle ware to ensure the account associated
    // with the request can access this resource. The middle ware should
    // be created in AccessTokenService.
    router.post('/', TaskController.createTask);
    router.get('/', TaskController.getAllTasks);
    router.get('/:id', TaskController.getTask);
    router.delete('/:id', TaskController.deleteTask);

    return router;
  }
}
