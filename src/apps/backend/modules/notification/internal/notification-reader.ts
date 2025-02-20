import { Notification, Preferences } from '../types';

import NotificationUtil from './notification-util';
import NotificationRepository from './store/notification-repository';

export default class NotificationReader {
  public static async getAccountNotificationPreferences(
    accountId: string
  ): Promise<Notification | null> {
    const notificationPreference = await NotificationRepository.findOne({
      account: accountId,
    });
    if (!notificationPreference) return null;
    return NotificationUtil.convertNotificationDBToNotification(
      notificationPreference
    );
  }

  public static async getNotificationPreferencesForAll(): Promise<
    Notification[]
  > {
    const notificationPreferences = await NotificationRepository.find({});
    if (!notificationPreferences) return null;
    return NotificationUtil.convertNotificationDBToNotificationMultiple(
      notificationPreferences
    );
  }

  public static async getAccountsWithParticularNotificationPreferences(
    preferences: Partial<Preferences>
  ): Promise<Notification[]> {
    const notificationPreferences = await NotificationRepository.find({
      preferences,
    });
    if (!notificationPreferences) return null;
    return NotificationUtil.convertNotificationDBToNotificationMultiple(
      notificationPreferences
    );
  }
}
