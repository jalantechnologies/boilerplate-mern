import { ApplicationRouter } from '../../application';

import { NotificationController } from './notification-controller';

export default class NotificationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new NotificationController();

    router.patch('/:accountId', ctrl.updateNotificationPreference);
  }
}
