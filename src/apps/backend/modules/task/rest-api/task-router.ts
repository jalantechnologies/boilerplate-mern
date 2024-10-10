import { appBaseRoute, basePath } from '../../../constants';
import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { registerRoute } from '../../application/route-metadata';
import { moduleName } from '../types';

import { TaskController } from './task-controller';

export default class TaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new TaskController();

    const moduleBaseRoute = '/tasks';

    const baseRoute = `${appBaseRoute}${moduleBaseRoute}`;

    router.use(accessAuthMiddleware);

    router.post(baseRoute, ctrl.createTask);
    registerRoute(
      'POST',
      baseRoute,
      'TaskController',
      'createTask',
      `${basePath}/${moduleName}/rest-api/task-controller.ts`,
      `${basePath}/${moduleName}/rest-api/task-serializer.ts`,
      'serializeTaskAsJSON',
      `${basePath}/${moduleName}/types.ts`,
      'Task',
    );
    router.get('/', ctrl.getTasks);
    router.get('/:id', ctrl.getTask);
    router.patch('/:id', ctrl.updateTask);
    router.delete('/:id', ctrl.deleteTask);
  }
}
