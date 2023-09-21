import { AccountAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import * as TaskController from './task-controller';

export default class TaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;

    router.use(AccountAuthMiddleware.ensureAccess);

    router.post('/', TaskController.createTask);
    router.get('/', TaskController.getTasks);
    router.get('/:id', TaskController.getTask);
    router.delete('/:id', TaskController.deleteTask);
  }
}
