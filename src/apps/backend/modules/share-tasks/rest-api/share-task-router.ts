import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { SharedTaskController } from './share-task-controller';

export default class ShareTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const sharedTaskController = new SharedTaskController();
  
    console.log('Registering route: /tasks/:taskId/share');
  
    router.use(accessAuthMiddleware); // Ensure middleware is correctly applied
    router.post('/share', sharedTaskController.shareTask); // Ensure this matches the frontend call
    router.get('/shared-tasks/:accountId', sharedTaskController.getSharedTasks); // Ensure this matches the frontend call
  }
}
