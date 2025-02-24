import { ApplicationRouter } from '../../application';

import { NotificationController } from './notification-controller';

export default class NotificationRouter extends ApplicationRouter {
  configure(): void {
    const { router } = this;
    const ctrl = new NotificationController();

    router.patch('/:accountId', ctrl.updateAccountNotificationPreference);
    router.post('/email', ctrl.sendEmailNotification);
    router.post('/sms', ctrl.sendSmsNotification);
    router.post('/fcm/:accountId', ctrl.registerFcmToken);
    router.patch('/fcm/:accountId', ctrl.updateFcmToken);
    router.delete('/fcm/:accountId', ctrl.deleteFcmToken);
    router.post('/push', ctrl.sendPushNotification);
  }
}
