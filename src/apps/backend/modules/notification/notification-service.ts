import mail, { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';
import _ from 'lodash';
import { Twilio } from 'twilio';

import { AccountService } from '../account';
import { ConfigService } from '../config';
import { Logger } from '../logger';

import FcmUtil from './fcm-util';
import NotificationReader from './internal/notification-reader';
import NotificationUtil from './internal/notification-util';
import NotificationWriter from './internal/notification-writer';
import {
  AccountsWithParticularNotificationPreferencesNotFoundError,
  BadRequestError,
  CreateNotificationPrefrenceParams,
  GetUserNotificationPreferencesParams,
  GetAccountsWithParticularPreferenceParams,
  Notification,
  NotificationPreferencesNotFoundError,
  NotificationPrefrenceTypeNotFoundError,
  SendEmailParams,
  SendEmailNotificationParams,
  SendSMSParams,
  SendSmsNotificationParams,
  SendPushNotificationParams,
  ServiceError,
  UpdateNotificationPrefrenceParams,
  RegisterFcmTokenParams,
  UpdateFcmTokenParams,
  DeleteFcmTokenParams,
} from './types';

export default class NotificationService {
  private static emailClient: MailService;
  private static smsClient: Twilio;

  public static async createNotificationPreference(
    params: CreateNotificationPrefrenceParams
  ): Promise<Notification> {
    const { accountId } = params;
    return NotificationWriter.createNotificationPreferences(accountId);
  }

  public static async updateAccountNotificationPreferences(
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

  public static async getAccountsWithParticularNotificationPreferences(
    params: GetAccountsWithParticularPreferenceParams
  ): Promise<string[]> {
    const notificationPreferences =
      await NotificationService.getNotificationInstancesWithParticularNotificationPreferences(
        params
      );
    if (!notificationPreferences) {
      return null;
    }
    return notificationPreferences.map((notification) => notification.account);
  }

  public static async getNotificationInstancesWithParticularNotificationPreferences(
    params: GetAccountsWithParticularPreferenceParams
  ): Promise<Notification[]> {
    const { preferences } = params;

    const isValid = NotificationUtil.validatePreferences(preferences);
    if (!isValid) {
      throw new NotificationPrefrenceTypeNotFoundError();
    }

    return NotificationReader.getAccountsWithParticularNotificationPreferences(
      preferences
    );
  }

  public static async sendEmailNotification(
    params: SendEmailNotificationParams
  ): Promise<void> {
    const { content } = params;
    const accountIdsWithEmailNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationPreferences(
        { preferences: { email: true } }
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
      'mailer.notificationEmailTemplateId'
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
    const { recipient, sender, templateId, templateData } = params;

    NotificationUtil.validateEmail(params);

    const msg: MailDataRequired = {
      to: recipient.email,
      from: {
        email: sender.email,
        name: sender.name,
      },
      templateId,
      dynamicTemplateData: {
        domain: ConfigService.getValue<string>('webAppHost'),
      },
    };
    if (params.templateData) {
      _.merge(msg.dynamicTemplateData, templateData);
    }

    try {
      const client = this.getEmailClient();
      await client.send(msg);
    } catch (err) {
      throw new ServiceError(err as Error);
    }
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
      await NotificationService.getAccountsWithParticularNotificationPreferences(
        { preferences: { sms: true } }
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
          return NotificationService.sendSMS(NotificationSmsParams);
        })
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    NotificationUtil.validateSms(params);

    try {
      const client = this.getSmsClient();

      await client.messages.create({
        to: NotificationUtil.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getValue(
          'twilio.messaging.messagingServiceSid'
        ),
        body: params.messageBody,
      });
    } catch (err) {
      throw new ServiceError(err as Error);
    }
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

  public static async updateFcmToken(
    params: UpdateFcmTokenParams
  ): Promise<Notification> {
    const { accountId, newFcmToken } = params;
    const isFcmTokenValid = !!newFcmToken && newFcmToken.trim() !== '';
    if (!isFcmTokenValid) {
      throw new BadRequestError('Invalid FCM token provided.');
    }
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    return NotificationWriter.updateFcmToken(accountId, newFcmToken);
  }

  public static async deleteFcmToken(
    params: DeleteFcmTokenParams
  ): Promise<void> {
    const { accountId } = params;
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    await NotificationWriter.deleteFcmToken(accountId);
  }

  public static async sendPushNotification(
    params: SendPushNotificationParams
  ): Promise<void> {
    const { title, body } = params;

    const NotificationInstancesWithPushNotificationEnabled =
      await NotificationService.getNotificationInstancesWithParticularNotificationPreferences(
        { preferences: { push: true } }
      );

    if (!NotificationInstancesWithPushNotificationEnabled) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    const notifcationInstances =
      NotificationInstancesWithPushNotificationEnabled.filter(
        (notification) => notification.fcmToken !== ''
      );

    await Promise.all(
      notifcationInstances.map((notification) => {
        const PushNotifcationParams = {
          fcmToken: notification.fcmToken,
          title,
          body,
        };
        return FcmUtil.sendPushNotification(PushNotifcationParams);
      })
    );
  }

  private static getEmailClient(): MailService {
    if (this.emailClient) {
      return this.emailClient;
    }

    mail.setApiKey(ConfigService.getValue('sendgrid.apiKey'));
    this.emailClient = mail;

    return this.emailClient;
  }

  private static getSmsClient(): Twilio {
    if (this.smsClient) {
      return this.smsClient;
    }

    this.smsClient = new Twilio(
      ConfigService.getValue('twilio.verify.accountSid'),
      ConfigService.getValue('twilio.verify.authToken')
    );
    return this.smsClient;
  }
}
