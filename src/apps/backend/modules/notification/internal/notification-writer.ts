import {
  Notification,
  NotificationChannelPreferences,
  NotificationTypePreferences,
} from '../types';

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

  public static async updateAccountNotificationChannelPreferences(
    accountId: string,
    notificationChannelPreferences: Partial<NotificationChannelPreferences>
  ): Promise<Notification | null> {
    const updateQuery = Object.entries(notificationChannelPreferences).reduce(
      (acc, [key, value]) => {
        acc[`notificationChannelPreferences.${key}`] = value;
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
    if (!notificationPreferencesUpdated) {
      return null;
    }
    return NotificationUtil.convertNotificationDBToNotification(
      notificationPreferencesUpdated
    );
  }

  public static async updateAccountNotificationTypePreferences(
    accountId: string,
    notificationTypePreferences: Partial<NotificationTypePreferences>
  ): Promise<Notification | null> {
    const updateQuery = Object.entries(notificationTypePreferences).reduce(
      (acc, [key, value]) => {
        acc[`notificationTypePreferences.${key}`] = value;
        return acc;
      },
      {} as Record<string, boolean>
    );

    const notificationTypePreferencesUpdated =
      await NotificationRepository.findOneAndUpdate(
        { account: accountId },
        { $set: updateQuery },
        { new: true }
      );
    if (!notificationTypePreferencesUpdated) {
      return null;
    }
    return NotificationUtil.convertNotificationDBToNotification(
      notificationTypePreferencesUpdated
    );
  }

  public static async registerFcmToken(
    accountId: string,
    fcmToken: string
  ): Promise<Notification> {
    const notificationFcmRegistered =
      await NotificationRepository.findOneAndUpdate(
        { account: accountId },
        { $addToSet: { fcmTokens: fcmToken } },
        { upsert: true, new: true }
      );
    return NotificationUtil.convertNotificationDBToNotification(
      notificationFcmRegistered
    );
  }

  public static async deleteFcmToken(
    accountId: string,
    fcmToken: string
  ): Promise<void> {
    await NotificationRepository.findOneAndUpdate(
      { account: accountId },
      { $pull: { fcmTokens: fcmToken } }
    );
  }
}
