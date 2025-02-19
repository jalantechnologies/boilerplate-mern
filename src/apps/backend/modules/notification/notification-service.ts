import NotificationReader from './internal/notification-reader';
import NotificationUtil from './internal/notification-util';
import NotificationWriter from './internal/notification-writer';
import {
  AccountsWithParticularNotificationPreferencesNotFoundError,
  CreateNotificationPrefrenceParams,
  GetUserNotificationPreferencesParams,
  GetAccountsWithParticularPreferenceParams,
  Notification,
  NotificationPreferencesNotFoundError,
  NotificationPrefrenceTypeNotFoundError,
  UpdateNotificationPrefrenceParams,
} from './types';

export default class NotificationService {
  public static async createNotificationPreference(
    params: CreateNotificationPrefrenceParams
  ): Promise<Notification> {
    const { accountId } = params;
    const notification =
      await NotificationWriter.createNotificationPreferences(accountId);
    return notification;
  }

  public static async updateNotificationPreference(
    params: UpdateNotificationPrefrenceParams
  ): Promise<Notification> {
    const { accountId, preferences } = params;
    const notificationUpdated =
      await NotificationWriter.updateAccountNotificationPreferences(
        accountId,
        preferences
      );
    if (!notificationUpdated) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return notificationUpdated;
  }

  public static async getAccountNotificationPreferences(
    params: GetUserNotificationPreferencesParams
  ): Promise<Notification> {
    const { accountId } = params;
    const notificationPreferences =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreferences) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return notificationPreferences;
  }

  public static async getAccountsWithParticularNotificationPreferences(
    params: GetAccountsWithParticularPreferenceParams
  ): Promise<string[]> {
    const { preferences } = params;

    const isValid = NotificationUtil.validatePreferences(preferences);
    if (!isValid) {
      throw new NotificationPrefrenceTypeNotFoundError();
    }

    const notificationPreferences =
      await NotificationReader.getAccountsWithParticularNotificationPreferences(
        preferences
      );
    if (!notificationPreferences) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    const accounts = notificationPreferences.map(
      (notification) => notification.account
    );

    return accounts;
  }
}
