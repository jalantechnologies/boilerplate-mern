// shared-task-router.ts
import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { SharedTaskController } from './shared-task-controller';

export default class ShareTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const sharedTaskController = new SharedTaskController();

    router.use(accessAuthMiddleware); // Ensure middleware is correctly applied
    router.post('tasks/:taskId/share', sharedTaskController.shareTask);
    router.get('/shared-tasks', sharedTaskController.getSharedTasks);
}
}
