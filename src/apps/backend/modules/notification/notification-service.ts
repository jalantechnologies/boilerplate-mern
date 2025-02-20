import mail, { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';
import _ from 'lodash';

import { AccountService } from '../account';
import { ConfigService } from '../config';

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
  SendEmailParams,
  SendEmailNotificationParams,
  ServiceError,
  UpdateNotificationPrefrenceParams,
} from './types';

export default class NotificationService {
  private static client: MailService;

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

    return notificationPreferences.map((notification) => notification.account);
  }

  public static async sendEmailNotification(
    params: SendEmailNotificationParams
  ): Promise<void> {
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
            content: params.content,
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
      const client = this.getClient();
      await client.send(msg);
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  private static getClient(): MailService {
    if (this.client) {
      return this.client;
    }

    mail.setApiKey(ConfigService.getValue('sendgrid.apiKey'));
    this.client = mail;

    return this.client;
  }
}
