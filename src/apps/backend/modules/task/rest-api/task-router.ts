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
    router.post('/:id', ctrl.shareTask);
    router.patch('/:id', ctrl.updateTask);
    router.delete('/:id', ctrl.deleteTask);
  }
}
