import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export enum NotificationPreferenceType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export type Preferences = Record<NotificationPreferenceType, boolean>;

export class Notification {
  account: string;
  id: string;
  preferences: Preferences;
}

export type GetUserNotificationPreferencesParams = {
  accountId: string;
};

export type GetAccountsWithParticularPreferenceParams = {
  preferences: Partial<Preferences>;
};

export type CreateNotificationPrefrenceParams = {
  accountId: string;
};

export type UpdateNotificationPrefrenceParams = {
  accountId: string;
  preferences: Partial<Preferences>;
};

export enum NotificationErrorCode {
  NOTIFICATION_PREFERENCE_TYPE_NOT_FOUND = 'NOTIFICATION_ERR_01',
  ACCOUNTID_NOT_FOUND = 'NOTIFICATION_ERR_02',
  ACCOUNTS_WITH_PARTICULAR_NOTIFICATIONS_NOT_FOUND = 'NOTIFICATION_ERR_03',
}

export class AccountsWithParticularNotificationPreferencesNotFoundError extends ApplicationError {
  code: NotificationErrorCode;

  constructor() {
    super(`No users found with the specified notification preferences`);
    this.code =
      NotificationErrorCode.ACCOUNTS_WITH_PARTICULAR_NOTIFICATIONS_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class NotificationPrefrenceTypeNotFoundError extends ApplicationError {
  code: NotificationErrorCode;

  constructor() {
    super('Notification Prefrence Type is invalid');
    this.code = NotificationErrorCode.NOTIFICATION_PREFERENCE_TYPE_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class NotificationPreferencesNotFoundError extends ApplicationError {
  code: NotificationErrorCode;

  constructor(accountId: string) {
    super(
      `System is unable to find notifiaction preferences for accountId ${accountId}.`
    );
    this.code = NotificationErrorCode.ACCOUNTID_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
