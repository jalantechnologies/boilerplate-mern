import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export interface LooseObject {
  [key: string]: unknown;
}

export class Notification {
  account: string;
  id: string;
  notificationChannelPreferences: NotificationChannelPreferences;
  notificationTypePreferences: NotificationTypePreferences;
  fcmTokens: string[];
}

export enum NotificationChannelPreferenceEnum {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
}

export enum NotificationTypePreferenceEnum {
  UPDATE = 'update',
  PROMOTIONAL = 'promotional',
  TRANSACTIONAL = 'transactional',
  SECURITY = 'security',
  REMINDER = 'reminder',
  SOCIAL = 'social',
  ALERT = 'alert',
}

export type NotificationResponse = { message: string } | Notification;

export type NotificationChannelPreferences = Record<
  NotificationChannelPreferenceEnum,
  boolean
>;

export type NotificationTypePreferences = Record<
  NotificationTypePreferenceEnum,
  boolean
>;

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

export type GetAccountsWithParticularNotificationChannelPreferenceParams = {
  notificationChannelPreferences: Partial<NotificationChannelPreferences>;
};

export type GetAccountsWithParticularNotificationTypePreferenceParams = {
  notificationTypePreferences: Partial<NotificationTypePreferences>;
};

export type UpdateNotificationChannelPrefrenceParams = {
  accountId: string;
  notificationChannelPreferences: Partial<NotificationChannelPreferences>;
};

export type UpdateNotificationTypePrefrenceParams = {
  accountId: string;
  notificationTypePreferences: Partial<NotificationTypePreferences>;
};

export interface PhoneUtilInterface {
  isValidNumber: (a: string) => boolean;
  parse: (a: string) => string;
}

export interface PhoneUtilInstance {
  getInstance: () => unknown;
}

export type PhoneNumber = {
  countryCode: string;
  phoneNumber: string;
};

export type SendEmailNotificationToAccountParams = {
  accountId: string;
  content: string;
  notificationType: string;
};

export type SendEmailNotificationToGroupParams = {
  accountIds: string[];
  content: string;
  notificationType: string;
};

export type SendEmailNotificationToAllParams = {
  content: string;
  notificationType: string;
};

export type SendSmsNotificationToAccountParams = {
  accountId: string;
  content: string;
  notificationType: string;
};

export type SendSmsNotificationToGroupParams = {
  accountIds: string[];
  content: string;
  notificationType: string;
};

export type SendSmsNotificationToAllParams = {
  content: string;
  notificationType: string;
};

export type SendPushNotificationToAccountParams = {
  accountId: string;
  body: string;
  notificationType: string;
  title: string;
};

export type SendPushNotificationToGroupParams = {
  accountIds: string[];
  body: string;
  notificationType: string;
  title: string;
};

export type SendPushNotificationToAllParams = {
  body: string;
  notificationType: string;
  title: string;
};

export type SendBroadcastNotificationParams = {
  body: string;
  notificationType: string;
  title: string;
};

export type BatchPushNotificationsParams = {
  body: string;
  fcmTokens: string[];
  title: string;
};
export type BatchSMSNotificationsParams = {
  smsList: {
    accountId: string;
    smsParams: SendSMSParams;
  }[];
};

export type SendEmailParams = {
  recipient: EmailRecipient;
  sender: EmailSender;
  templateData?: LooseObject;
  templateId: string;
};

export type SendSMSParams = {
  messageBody: string;
  recipientPhone: PhoneNumber;
};

export type PushNotifcationParams = {
  body: string;
  fcmToken: string;
  title: string;
};

export type SendEmailNotificationParams = {
  content: string;
};

export type SendPushNotificationParams = {
  body: string;
  title: string;
};

export type SendSmsNotificationParams = {
  content: string;
};

export type ValidationFailure = {
  field: string;
  message: string;
};

export type FcmTokenParams = {
  fcmToken: string;
};

export type RegisterFcmTokenParams = {
  accountId: string;
  fcmToken: string;
};

export type DeleteFcmTokenParams = {
  accountId: string;
  fcmToken: string;
};

export enum NotificationErrorCode {
  NOTIFICATION_PREFERENCE_TYPE_NOT_FOUND = 'NOTIFICATION_ERR_01',
  ACCOUNTID_NOT_FOUND = 'NOTIFICATION_ERR_02',
  ACCOUNTS_WITH_PARTICULAR_NOTIFICATIONS_NOT_FOUND = 'NOTIFICATION_ERR_03',
  VALIDATION_ERROR = 'NOTIFICATION_ERR_04',
  SERVICE_ERROR = 'NOTIFICATION_ERR_05',
  INVALID_FIREBASE_SERVICE_ACCOUNT_PATH = 'NOTIFICATION_ERR_06',
  BAD_REQUEST = 'NOTIFICATION_ERR_07',
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
    super(`Notification preferences for accountId ${accountId} not found.`);
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

export class InvalidFirebaseServiceAccountPathError extends ApplicationError {
  code: NotificationErrorCode;

  constructor() {
    super();
    this.code = NotificationErrorCode.INVALID_FIREBASE_SERVICE_ACCOUNT_PATH;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}

export class BadRequestError extends ApplicationError {
  code: NotificationErrorCode;

  constructor(msg: string) {
    super(msg);
    this.code = NotificationErrorCode.BAD_REQUEST;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class NotificationPermissionDeniedError extends ApplicationError {
  code: NotificationErrorCode;

  constructor() {
    super('Notification Permission denied');
    this.code = NotificationErrorCode.BAD_REQUEST;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
