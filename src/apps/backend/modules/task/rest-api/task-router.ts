// task-router.ts
import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { TaskController } from './task-controller';

export default class TaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new TaskController();

    router.use(accessAuthMiddleware);

    router.post('/', ctrl.createTask);
    router.get('/', ctrl.getTasks);
    router.get('/:id', ctrl.getTask);
    router.patch('/:id', ctrl.updateTask);
    router.delete('/:id', ctrl.deleteTask);
    router.post('/:id/share', ctrl.shareTask); // Define POST /tasks/:id/share endpoint
  }
}
