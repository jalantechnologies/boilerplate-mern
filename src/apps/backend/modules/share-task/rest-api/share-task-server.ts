import { ApplicationServer } from '../../application';

import ShareTaskRouter from './share-task-router';

export default class ShareTaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new ShareTaskRouter();

    server.use('/share-with', router.router);
  }
}
