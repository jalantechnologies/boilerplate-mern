import { ApplicationServer } from '../../application';
import ShareTaskRouter from './shared-task-router';

export default class ShareTaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const shareRouter = new ShareTaskRouter();

    server.use('/share-tasks', shareRouter.router);
  }
}
export {ShareTaskServer}