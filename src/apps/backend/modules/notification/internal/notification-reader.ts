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
    return NotificationUtil.convertNotificationDBToNotification(
      notificationPreference
    );
  }

  public static async getNotificationPreferencesForAll(): Promise<
    Notification[]
  > {
    const notificationPreferences = await NotificationRepository.find({});
    return notificationPreferences.map((notificationPreference) =>
      NotificationUtil.convertNotificationDBToNotification(
        notificationPreference
      )
    );
  }

  public static async getAccountsWithParticularNotificationPreferences(
    preferences: Partial<Preferences>
  ): Promise<Notification[]> {
    const notificationPreferences = await NotificationRepository.find({
      preferences,
    });
    return notificationPreferences.map((notificationPreference) =>
      NotificationUtil.convertNotificationDBToNotification(
        notificationPreference
      )
    );
  }
}
