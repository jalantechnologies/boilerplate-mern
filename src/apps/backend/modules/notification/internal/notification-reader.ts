import {
  Notification,
  NotificationChannelPreferences,
  NotificationTypePreferences,
} from '../types';

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
    Notification[] | null
  > {
    const notificationPreferences = await NotificationRepository.find({});
    if (!notificationPreferences) return null;
    return NotificationUtil.convertNotificationDBToNotificationMultiple(
      notificationPreferences
    );
  }

  public static async getAccountsWithParticularNotificationChannelPreferences(
    notificationChannelPreferences: Partial<NotificationChannelPreferences>
  ): Promise<Notification[] | null> {
    const dbQuery = Object.entries(notificationChannelPreferences).reduce(
      (acc, [key, value]) => {
        acc[`notificationChannelPreferences.${key}`] = value;
        return acc;
      },
      {} as Record<string, boolean>
    );
    const notificationPreferences = await NotificationRepository.find(dbQuery);

    if (!notificationPreferences || notificationPreferences.length === 0)
      return null;
    return NotificationUtil.convertNotificationDBToNotificationMultiple(
      notificationPreferences
    );
  }

  public static async getAccountsWithParticularNotificationTypePreferences(
    notificationTypePreferences: Partial<NotificationTypePreferences>
  ): Promise<Notification[] | null> {
    const dbQuery = Object.entries(notificationTypePreferences).reduce(
      (acc, [key, value]) => {
        acc[`notificationTypePreferences.${key}`] = value;
        return acc;
      },
      {} as Record<string, boolean>
    );
    const notificationPreferences = await NotificationRepository.find(dbQuery);

    if (!notificationPreferences || notificationPreferences.length === 0)
      return null;
    return NotificationUtil.convertNotificationDBToNotificationMultiple(
      notificationPreferences
    );
  }
}
