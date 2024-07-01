import { accessAuthMiddleware } from '../../access-token/index.js';
import { ApplicationRouter } from '../../application/index.js';
import { SharedTaskController } from './shared-task-controller.js';

export default class ShareTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const sharedTaskController = new SharedTaskController();
  
    console.log('Registering route: /tasks/:taskId/share');
  
    router.use(accessAuthMiddleware); 
    router.post('/share', sharedTaskController.shareTask); 
    router.get('/shared-tasks/:accountId', sharedTaskController.getSharedTasks); 
  }
}
