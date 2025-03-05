import { accessAuthMiddleware } from '../../access-token';
import { ApplicationRouter } from '../../application';

import { ShareTaskController } from './share-task-controller';

export default class ShareTaskRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new ShareTaskController();

    router.use(accessAuthMiddleware);

    router.post('/', ctrl.createShareTask);
  }
}
