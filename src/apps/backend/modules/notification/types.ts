import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export interface LooseObject {
  [key: string]: unknown;
}

export class Notification {
  account: string;
  id: string;
  preferences: Preferences;
}

export enum NotificationPreferenceType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export type NotificationResponse = { message: string } | Notification;

export type Preferences = Record<NotificationPreferenceType, boolean>;

export type EmailSender = {
  email: string;
  name: string;
};

export type EmailRecipient = {
  email: string;
};

export type CreateNotificationPrefrenceParams = {
  accountId: string;
};

export type GetUserNotificationPreferencesParams = {
  accountId: string;
};

export type GetAccountsWithParticularPreferenceParams = {
  preferences: Partial<Preferences>;
};

export type UpdateNotificationPrefrenceParams = {
  accountId: string;
  preferences: Partial<Preferences>;
};

export type SendEmailParams = {
  recipient: EmailRecipient;
  sender: EmailSender;
  templateData?: LooseObject;
  templateId: string;
};

export type SendEmailNotificationParams = {
  content: string;
};

export type ValidationFailure = {
  field: string;
  message: string;
};

export enum NotificationErrorCode {
  NOTIFICATION_PREFERENCE_TYPE_NOT_FOUND = 'NOTIFICATION_ERR_01',
  ACCOUNTID_NOT_FOUND = 'NOTIFICATION_ERR_02',
  ACCOUNTS_WITH_PARTICULAR_NOTIFICATIONS_NOT_FOUND = 'NOTIFICATION_ERR_03',
  VALIDATION_ERROR = 'NOTIFICATION_ERR_04',
  SERVICE_ERROR = 'NOTIFICATION_ERR_05',
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

export class ValidationError extends ApplicationError {
  code: NotificationErrorCode;
  failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[] = []) {
    super(msg);
    this.code = NotificationErrorCode.VALIDATION_ERROR;
    this.failures = failures;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class ServiceError extends ApplicationError {
  code: NotificationErrorCode;

  constructor(err: Error) {
    super(err.message);
    this.stack = err.stack;
    this.code = NotificationErrorCode.SERVICE_ERROR;
    this.httpStatusCode = HttpStatusCodes.SERVICE_UNAVAILABLE;
  }
}
