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
<<<<<<< HEAD
    router.get('/shared/:id', ctrl.getSharedTasks);
=======
>>>>>>> 09e6ecb626c02d7c8caec3ecdfe0c0c0be1e2e4c
    router.get('/:id', ctrl.getTask); 
    router.patch('/:id', ctrl.updateTask);
    router.delete('/:id', ctrl.deleteTask);
  }
}
