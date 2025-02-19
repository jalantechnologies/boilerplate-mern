import { Notification } from '../types';

export const serializeNotificationtAsJSON = (
  notification: Notification
): unknown => ({
  id: notification.id,
  account: notification.account,
  preferences: notification.preferences,
});
