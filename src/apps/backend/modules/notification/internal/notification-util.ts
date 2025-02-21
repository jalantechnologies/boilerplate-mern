import { PhoneNumberUtil } from 'google-libphonenumber';

import { emailRegex } from '../constants';
import {
  Notification,
  Preferences,
  PhoneNumber,
  PhoneUtilInstance,
  PhoneUtilInterface,
  NotificationPreferenceType,
  SendEmailParams,
  SendSMSParams,
  ValidationError,
  ValidationFailure,
} from '../types';

import { NotificationDB } from './store/notification-db';

export default class NotificationUtil {
  public static convertNotificationDBToNotification(
    notificationDb: NotificationDB
  ): Notification {
    const notification = new Notification();
    notification.id = notificationDb._id.toString();
    notification.account = notificationDb.account.toString();
    notification.preferences = notificationDb.preferences;

    return notification;
  }

  public static convertNotificationDBToNotificationMultiple(
    notificationDbs: NotificationDB[]
  ): Notification[] {
    return notificationDbs.map((notificationDb) =>
      NotificationUtil.convertNotificationDBToNotification(notificationDb)
    );
  }

  public static validatePreferences(
    preferences: Partial<Preferences>
  ): boolean {
    const validPreferences = Object.values(NotificationPreferenceType);
    return Object.keys(preferences).every((key) =>
      validPreferences.includes(key as NotificationPreferenceType)
    );
  }

  public static validateEmail(params: SendEmailParams): void {
    const failures: ValidationFailure[] = [];
    const recipientEmailValid = this.validateEmailRegex(params.recipient.email);
    const senderEmailValid = this.validateEmailRegex(params.sender.email);
    const senderNameValid = !!params.sender.name;

    if (!recipientEmailValid) {
      failures.push({
        field: 'recipient.email',
        message:
          'Please specify valid recipient email in format you@example.com.',
      });
    }

    if (!senderEmailValid) {
      failures.push({
        field: 'sender.email',
        message: 'Please specify valid sender email in format you@example.com.',
      });
    }

    if (!senderNameValid) {
      failures.push({
        field: 'sender.name',
        message: 'Please specify a non empty sender name.',
      });
    }

    if (failures.length) {
      throw new ValidationError(
        'Email cannot be send, please check the params validity.',
        failures
      );
    }
  }

  public static validateEmailRegex(email: string): boolean {
    return emailRegex.test(String(email).toLowerCase());
  }

  public static validateSms(params: SendSMSParams): void {
    const failures: ValidationFailure[] = [];
    const phoneUtil = <PhoneUtilInterface>(
      (<PhoneUtilInstance>PhoneNumberUtil).getInstance()
    );

    const isRecipientPhoneValid: boolean = phoneUtil.isValidNumber(
      phoneUtil.parse(this.phoneNumberToString(params.recipientPhone))
    );

    const isMessageValid = !!params.messageBody;
    if (!isRecipientPhoneValid) {
      failures.push({
        field: 'recipientPhone',
        message:
          'Please specify valid recipient phone number in format +12124567890.',
      });
    }
    if (!isMessageValid) {
      failures.push({
        field: 'messageBody',
        message: 'Please specify a non empty message body.',
      });
    }
    if (failures.length) {
      throw new ValidationError(
        'SMS cannot be send, please check the params validity.',
        failures
      );
    }
  }

  public static phoneNumberToString(phoneNumber: PhoneNumber): string {
    return `${phoneNumber.countryCode}${phoneNumber.phoneNumber}`;
  }
}
