// const validPreferences = Object.values(NotificationPreferenceType);
//         if(!validPreferences.includes(preferenceType)){
//             throw new NotificationPrefrenceTypeNotFoundError();
//         }
import {
  Notification,
  Preferences,
  NotificationPreferenceType,
} from '../types';

import { NotificationDB } from './store/notification-db';

export default class NotificationUtil {
  public static convertNotificationDBToNotification(
    notificationDb: NotificationDB
  ): Notification {
    const notification = new Notification();
    notification.id = notificationDb._id.toString();
    notification.account = notificationDb.account.toString();
    notification.preferences = notificationDb.preferences;

    return notification;
  }

  public static validatePreferences(
    preferences: Partial<Preferences>
  ): boolean {
    const validPreferences = Object.values(NotificationPreferenceType);
    return Object.keys(preferences).every((key) =>
      validPreferences.includes(key as NotificationPreferenceType)
    );
  }
}
