import { ApplicationServer } from '../../application';

import ShareTaskRequestRouter from './share-task-request-router';

export default class ShareTaskRequestServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new ShareTaskRequestRouter();

    server.use('/tasks/:taskId/share-task-requests', router.router);
  }
}