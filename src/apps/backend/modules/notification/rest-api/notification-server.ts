import { ApplicationServer } from '../../application';

import NotificationRouter from './notification-router';

export default class NotificationServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new NotificationRouter();

    server.use('/notifications', router.router);
  }
}
