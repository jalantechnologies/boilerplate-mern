import { NotificationResponse } from '../types';

export const serializeNotificationtAsJSON = (
  notification: NotificationResponse
): unknown => {
  if ('message' in notification) {
    return { message: notification.message };
  }
  return {
    id: notification.id,
    account: notification.account,
    preferences: notification.preferences,
  };
};
