import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';
import { ShareTaskRequestController } from './share-task-request-controller';

export default class ShareTaskRequestRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const controller = new ShareTaskRequestController();

    router.use(accessAuthMiddleware);

    router.post('/', controller.createSharedTaskRequest);
  }
}