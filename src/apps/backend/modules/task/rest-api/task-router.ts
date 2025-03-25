import { ApplicationRouter } from 'backend/modules/application';
import { accessAuthMiddleware } from 'backend/modules/authentication';
import { TaskController } from 'backend/modules/task/rest-api/task-controller';

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
  }
}
