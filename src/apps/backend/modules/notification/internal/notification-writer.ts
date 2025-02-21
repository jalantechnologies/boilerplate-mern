import { Notification, Preferences } from '../types';

import NotificationUtil from './notification-util';
import NotificationRepository from './store/notification-repository';

export default class NotificationWriter {
  public static async createNotificationPreferences(
    accountId: string
  ): Promise<Notification> {
    let notification = await NotificationRepository.findOne({
      account: accountId,
    });
    if (!notification) {
      notification = await NotificationRepository.create({
        account: accountId,
      });
    }
    return NotificationUtil.convertNotificationDBToNotification(notification);
  }

  public static async updateAccountNotificationPreferences(
    accountId: string,
    preferences: Partial<Preferences>
  ): Promise<Notification | null> {
    const updateQuery = Object.entries(preferences).reduce(
      (acc, [key, value]) => {
        acc[`preferences.${key}`] = value;
        return acc;
      },
      {} as Record<string, boolean>
    );

    const notificationPreferencesUpdated =
      await NotificationRepository.findOneAndUpdate(
        { account: accountId },
        { $set: updateQuery },
        { new: true }
      );

    return NotificationUtil.convertNotificationDBToNotification(
      notificationPreferencesUpdated
    );
  }
}
