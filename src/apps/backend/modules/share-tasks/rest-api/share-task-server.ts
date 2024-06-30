import { ApplicationServer } from '../../application';
import ShareTaskRouter from './share-task-router';

export default class ShareTaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const shareRouter = new ShareTaskRouter();

    server.use('/tasks', shareRouter.router); // Ensure /api is prefixed
  }
}
export { ShareTaskServer }
