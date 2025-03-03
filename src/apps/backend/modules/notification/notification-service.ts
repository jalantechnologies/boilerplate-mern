import { AccountService } from '../account';
import { ConfigService } from '../config';
import { Logger } from '../logger';

import EmailUtil from './email-util';
import FcmUtil from './fcm-util';
import NotificationReader from './internal/notification-reader';
import NotificationUtil from './internal/notification-util';
import NotificationWriter from './internal/notification-writer';
import SmsUtil from './sms-util';
import {
  AccountsWithParticularNotificationPreferencesNotFoundError,
  BadRequestError,
  CreateNotificationPrefrenceParams,
  GetUserNotificationPreferencesParams,
  GetAccountsWithParticularNotificationChannelPreferenceParams,
  GetAccountsWithParticularNotificationTypePreferenceParams,
  Notification,
  NotificationPreferencesNotFoundError,
  NotificationPermissionDeniedError,
  NotificationPrefrenceTypeNotFoundError,
  SendEmailNotificationToAccountParams,
  SendEmailParams,
  SendEmailNotificationParams,
  SendSMSParams,
  SendSmsNotificationParams,
  SendPushNotificationParams,
  UpdateNotificationChannelPrefrenceParams,
  UpdateNotificationTypePrefrenceParams,
  RegisterFcmTokenParams,
  DeleteFcmTokenParams,
} from './types';

export default class NotificationService {
  public static async createNotificationPreference(
    params: CreateNotificationPrefrenceParams
  ): Promise<Notification> {
    const { accountId } = params;
    return NotificationWriter.createNotificationPreferences(accountId);
  }

  public static async updateAccountNotificationChannelPreferences(
    params: UpdateNotificationChannelPrefrenceParams
  ): Promise<Notification> {
    const { accountId, notificationChannelPreferences } = params;
    const notificationUpdated =
      await NotificationWriter.updateAccountNotificationChannelPreferences(
        accountId,
        notificationChannelPreferences
      );
    if (!notificationUpdated) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return notificationUpdated;
  }

  public static async updateAccountNotificationTypePreferences(
    params: UpdateNotificationTypePrefrenceParams
  ): Promise<Notification> {
    const { accountId, notificationTypePreferences } = params;
    const notificationUpdated =
      await NotificationWriter.updateAccountNotificationTypePreferences(
        accountId,
        notificationTypePreferences
      );
    if (!notificationUpdated) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return notificationUpdated;
  }

  public static async getAccountNotificationPreference(
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

  public static async getAccountsWithParticularNotificationChannelPreferences(
    params: GetAccountsWithParticularNotificationChannelPreferenceParams
  ): Promise<string[]> {
    const notificationPreferences =
      await NotificationService.getNotificationInstancesWithParticularNotificationChannelPreferences(
        params
      );
    if (!notificationPreferences) {
      return null;
    }
    return notificationPreferences.map((notification) => notification.account);
  }

  public static async getNotificationInstancesWithParticularNotificationChannelPreferences(
    params: GetAccountsWithParticularNotificationChannelPreferenceParams
  ): Promise<Notification[]> {
    const { notificationChannelPreferences } = params;

    const isValid = NotificationUtil.validateNotificationChannelPreferences(
      notificationChannelPreferences
    );
    if (!isValid) {
      throw new NotificationPrefrenceTypeNotFoundError();
    }

    return NotificationReader.getAccountsWithParticularNotificationChannelPreferences(
      notificationChannelPreferences
    );
  }

  public static async getAccountsWithParticularNotificationTypePreferences(
    params: GetAccountsWithParticularNotificationTypePreferenceParams
  ): Promise<string[]> {
    const notificationPreferences =
      await NotificationService.getNotificationInstancesWithParticularNotificationTypePreferences(
        params
      );
    if (!notificationPreferences) {
      return null;
    }
    return notificationPreferences.map((notification) => notification.account);
  }

  public static async getNotificationInstancesWithParticularNotificationTypePreferences(
    params: GetAccountsWithParticularNotificationTypePreferenceParams
  ): Promise<Notification[]> {
    const { notificationTypePreferences } = params;

    const isValid = NotificationUtil.validateNotificationTypePreferences(
      notificationTypePreferences
    );
    if (!isValid) {
      throw new NotificationPrefrenceTypeNotFoundError();
    }

    return NotificationReader.getAccountsWithParticularNotificationTypePreferences(
      notificationTypePreferences
    );
  }

  public static async sendEmailNotificationToAccount(
    params: SendEmailNotificationToAccountParams
  ): Promise<void> {
    const { accountId, content, notificationType } = params;
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    if (
      !notificationPreference.notificationChannelPreferences.email ||
      !notificationPreference.notificationTypePreferences[notificationType]
    ) {
      throw new NotificationPermissionDeniedError();
    }
    const accountReference = await AccountService.getAccountById({ accountId });
    if (!accountReference || !accountReference.username) {
      throw new BadRequestError(
        `No valid email found for accountId ${accountId}`
      );
    }
    const defaultEmail = ConfigService.getValue<string>('mailer.defaultEmail');
    const defaultEmailName = ConfigService.getValue<string>(
      'mailer.defaultEmailName'
    );
    const notificationEmailTemplateId = ConfigService.getValue<string>(
      'mailer.notificationMailTemplateId'
    );

    const emailParams: SendEmailParams = {
      recipient: { email: accountReference.username },
      sender: { email: defaultEmail, name: defaultEmailName },
      templateData: { firstName: accountReference.firstName, content },
      templateId: notificationEmailTemplateId,
    };

    await NotificationService.sendEmail(emailParams);
  }

  public static async sendEmailNotification(
    params: SendEmailNotificationParams
  ): Promise<void> {
    const { content } = params;
    const accountIdsWithEmailNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationChannelPreferences(
        { notificationChannelPreferences: { email: true } }
      );

    if (!accountIdsWithEmailNotificationEnabled) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    const accountReferences = await Promise.all(
      accountIdsWithEmailNotificationEnabled.map((accountId) =>
        AccountService.getAccountById({ accountId })
      )
    );

    const defaultEmail = ConfigService.getValue<string>('mailer.defaultEmail');
    const defaultEmailName = ConfigService.getValue<string>(
      'mailer.defaultEmailName'
    );
    const notificationEmailTemplateId = ConfigService.getValue<string>(
      'mailer.notificationMailTemplateId'
    );

    await Promise.all(
      accountReferences
        .filter((accountReference) => accountReference.username)
        .map((accountReference) => {
          const { firstName, username } = accountReference;
          const templateData = {
            firstName,
            content,
            username,
          };
          const NotificationEmailParams: SendEmailParams = {
            recipient: {
              email: username,
            },
            sender: {
              email: defaultEmail,
              name: defaultEmailName,
            },
            templateData,
            templateId: notificationEmailTemplateId,
          };
          return NotificationService.sendEmail(NotificationEmailParams);
        })
    );
  }

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    return EmailUtil.sendEmail(params);
  }

  public static async sendSmsNotification(
    params: SendSmsNotificationParams
  ): Promise<void> {
    const { content } = params;

    const isSmsEnabled = ConfigService.getValue('sms.enabled');

    if (!isSmsEnabled) {
      Logger.warn(`SMS not enabled. Could not send message - ${content}`);
      return;
    }

    const accountIdsWithSmsNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationChannelPreferences(
        { notificationChannelPreferences: { sms: true } }
      );

    if (!accountIdsWithSmsNotificationEnabled) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    const accountReferences = await Promise.all(
      accountIdsWithSmsNotificationEnabled.map((accountId) =>
        AccountService.getAccountById({ accountId })
      )
    );
    await Promise.all(
      accountReferences
        .filter((accountReference) => accountReference.phoneNumber)
        .map((accountReference) => {
          const { phoneNumber } = accountReference;
          const NotificationSmsParams: SendSMSParams = {
            messageBody: content,
            recipientPhone: phoneNumber,
          };
          return SmsUtil.sendSMS(NotificationSmsParams);
        })
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    return SmsUtil.sendSMS(params);
  }

  public static async registerFcmToken(
    params: RegisterFcmTokenParams
  ): Promise<Notification> {
    const { accountId, fcmToken } = params;
    const isFcmTokenValid = !!fcmToken && fcmToken.trim() !== '';
    if (!isFcmTokenValid) {
      throw new BadRequestError('Invalid FCM token provided.');
    }
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return NotificationWriter.registerFcmToken(accountId, fcmToken);
  }

  public static async deleteFcmToken(
    params: DeleteFcmTokenParams
  ): Promise<void> {
    const { accountId, fcmToken } = params;
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    await NotificationWriter.deleteFcmToken(accountId, fcmToken);
  }

  public static async sendPushNotification(
    params: SendPushNotificationParams
  ): Promise<void> {
    const { title, body } = params;

    const NotificationInstancesWithPushNotificationEnabled =
      await NotificationService.getNotificationInstancesWithParticularNotificationChannelPreferences(
        { notificationChannelPreferences: { push: true } }
      );

    if (!NotificationInstancesWithPushNotificationEnabled) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    const notifcationInstances =
      NotificationInstancesWithPushNotificationEnabled.filter(
        (notification) =>
          notification.fcmTokens && notification.fcmTokens.length > 0
      );

    await Promise.all(
      notifcationInstances.flatMap((notification) =>
        notification.fcmTokens.map((fcmToken) =>
          FcmUtil.sendPushNotification({ fcmToken, title, body })
        )
      )
    );
  }
}
