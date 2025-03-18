import { ApplicationRouter } from '../../application';

import { NotificationController } from './notification-controller';

export default class NotificationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new NotificationController();

    router.patch(
      '/:accountId/preferences',
      ctrl.updateAccountNotificationChannelPreference
    );
    router.patch(
      '/:accountId/notification-types',
      ctrl.updateAccountNotificationTypePreference
    );
    router.post('/fcm/:accountId', ctrl.registerFcmToken);
    router.delete('/fcm/:accountId', ctrl.deleteFcmToken);
  }
}
