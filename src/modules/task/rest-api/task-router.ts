import { Router } from 'express';
import TaskController from './task-controller';

export default class TaskRouter {
  public static getRoutes(): Router {
    const router = Router();

    const controller = new TaskController();

    router.post('/', controller.createTask);
    router.get('/', controller.getAllTasks);
    router.get('/:id', controller.getTask);
    router.delete('/:id', controller.deleteTask);

    return router;
  }
}
