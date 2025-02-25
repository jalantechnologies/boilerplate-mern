import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export interface LooseObject {
  [key: string]: unknown;
}

export class Notification {
  account: string;
  id: string;
  preferences: Preferences;
  fcmToken: string;
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

export type UpdateFcmTokenParams = {
  accountId: string;
  newFcmToken: string;
};

export type DeleteFcmTokenParams = {
  accountId: string;
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
    super(`Notifiaction preferences for accountId ${accountId} not found.`);
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
