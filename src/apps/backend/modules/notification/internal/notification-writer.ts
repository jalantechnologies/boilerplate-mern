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

  public static async registerFcmToken(
    accountId: string,
    fcmToken: string
  ): Promise<Notification> {
    const notificationFcmRegistered =
      await NotificationRepository.findOneAndUpdate(
        { account: accountId },
        { fcmToken },
        { upsert: true, new: true }
      );
    return NotificationUtil.convertNotificationDBToNotification(
      notificationFcmRegistered
    );
  }

  public static async updateFcmToken(
    accountId: string,
    newFcmToken: string
  ): Promise<Notification> {
    const notificationFcmUpdated =
      await NotificationRepository.findOneAndUpdate(
        { account: accountId },
        { fcmToken: newFcmToken },
        { new: true }
      );
    return NotificationUtil.convertNotificationDBToNotification(
      notificationFcmUpdated
    );
  }

  public static async deleteFcmToken(accountId: string): Promise<void> {
    await NotificationRepository.findOneAndUpdate(
      { account: accountId },
      { fcmToken: '' }
    );
  }
}
