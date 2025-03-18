import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

import { AccountService } from '../account';
import { ConfigService } from '../config';
import { Logger } from '../logger';

import { batchSize } from './constants';
import EmailService from './email-service';
import NotificationReader from './internal/notification-reader';
import NotificationUtil from './internal/notification-util';
import NotificationWriter from './internal/notification-writer';
import PushService from './push-service';
import SmsService from './sms-service';
import {
  AccountsWithParticularNotificationPreferencesNotFoundError,
  BadRequestError,
  CreateNotificationPrefrenceParams,
  EmailNotificationResponse,
  GetUserNotificationPreferencesParams,
  GetAccountsWithParticularNotificationChannelPreferenceParams,
  GetAccountsWithParticularNotificationTypePreferenceParams,
  Notification,
  NotificationChannelPreferences,
  NotificationTypePreferences,
  NotificationChannelPreferenceEnum,
  NotificationTypePreferenceEnum,
  NotificationPreferencesNotFoundError,
  NotificationPermissionDeniedError,
  NotificationTypePreferencesInvalidError,
  NotificationChannelPreferencesInvalidError,
  PushNotificationResponse,
  SendEmailNotificationToAccountParams,
  SendEmailNotificationToGroupParams,
  SendEmailNotificationToAllParams,
  SendSmsNotificationToAccountParams,
  SendSmsNotificationToGroupParams,
  SendSmsNotificationToAllParams,
  SendPushNotificationToAccountParams,
  SendPushNotificationToGroupParams,
  SendPushNotificationToAllParams,
  SendBroadcastNotificationParams,
  SendEmailParams,
  SendSMSParams,
  SMSNotificationResponse,
  UpdateNotificationChannelPrefrenceParams,
  UpdateNotificationTypePrefrenceParams,
  RegisterFcmTokenParams,
  DeleteFcmTokenParams,
} from './types';

export default class NotificationService {
  public static async createNotificationPreference(
    params: CreateNotificationPrefrenceParams
  ): Promise<Notification> {
    const {
      accountId,
      notificationChannelPreferences,
      notificationTypePreferences,
    } = params;
    return NotificationWriter.createNotificationPreferences(
      accountId,
      notificationChannelPreferences,
      notificationTypePreferences
    );
  }

  public static async updateAccountNotificationChannelPreferences(
    params: UpdateNotificationChannelPrefrenceParams
  ): Promise<Notification> {
    const { accountId, notificationChannelPreferences } = params;
    if (
      !NotificationUtil.validateNotificationChannelPreferences(
        notificationChannelPreferences
      )
    ) {
      throw new NotificationChannelPreferencesInvalidError();
    }
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
    if (
      !NotificationUtil.validateNotificationTypePreferences(
        notificationTypePreferences
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
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

  public static getAllNotificationChannels(): NotificationChannelPreferences {
    return Object.values(NotificationChannelPreferenceEnum).reduce(
      (acc, key) => {
        acc[key] = true;
        return acc;
      },
      {} as NotificationChannelPreferences
    );
  }

  public static getAllNotificationTypes(): NotificationTypePreferences {
    return Object.values(NotificationTypePreferenceEnum).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as NotificationTypePreferences);
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
      throw new NotificationChannelPreferencesInvalidError();
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
      throw new NotificationTypePreferencesInvalidError();
    }

    return NotificationReader.getAccountsWithParticularNotificationTypePreferences(
      notificationTypePreferences
    );
  }

  public static async sendEmailNotificationToAccount(
    params: SendEmailNotificationToAccountParams
  ): Promise<void> {
    const { accountId, content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }

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
    Logger.info(
      `Successfully sent email notification to accountId: ${accountId}:`
    );
  }

  public static async sendEmailNotificationToGroup(
    params: SendEmailNotificationToGroupParams
  ): Promise<EmailNotificationResponse> {
    const { accountIds, content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const unsuccessful: string[] = [];
    const emailBatches: SendEmailParams[][] = [];

    await Promise.all(
      accountIds.map(async (accountId) => {
        try {
          const notificationPreference =
            await NotificationReader.getAccountNotificationPreferences(
              accountId
            );
          if (
            !notificationPreference ||
            !notificationPreference.notificationChannelPreferences.email ||
            !notificationPreference.notificationTypePreferences[
              notificationType
            ]
          ) {
            unsuccessful.push(accountId);
            return;
          }
          const accountReference = await AccountService.getAccountById({
            accountId,
          });

          if (!accountReference || !accountReference.username) {
            unsuccessful.push(accountId);
            return;
          }
          const defaultEmail = ConfigService.getValue<string>(
            'mailer.defaultEmail'
          );
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

          if (
            !emailBatches.length ||
            emailBatches[emailBatches.length - 1].length >= batchSize
          ) {
            emailBatches.push([]);
          }
          emailBatches[emailBatches.length - 1].push(emailParams);
        } catch (error) {
          unsuccessful.push(accountId);
        }
      })
    );

    await Promise.all(
      emailBatches.map(async (batch, i) => {
        try {
          await EmailService.sendBatchEmail({ emails: batch });
          Logger.info(
            `Successfully sent batch email notifications at batch index: ${i}:`
          );
        } catch (error) {
          Logger.error(
            `Failed to send batch email notifications at batch index: ${i}:`,
            error
          );
        }
      })
    );

    Logger.info(
      `Batch email notifications completed. Unsuccessful accounts: ${unsuccessful.length}`
    );
    return { unsuccessful };
  }

  public static async sendEmailNotificationToAll(
    params: SendEmailNotificationToAllParams
  ): Promise<EmailNotificationResponse> {
    const { content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const getChannelPreferencesParams = {
      notificationChannelPreferences: { email: true },
    };
    const accountIdsWithEmailNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationChannelPreferences(
        getChannelPreferencesParams
      );
    const accountsWithNotificationTypeEnabled =
      await NotificationService.getAccountsWithParticularNotificationTypePreferences(
        {
          notificationTypePreferences: { [notificationType]: true },
        }
      );
    const filteredAccountIds = accountIdsWithEmailNotificationEnabled.filter(
      (accountId) => accountsWithNotificationTypeEnabled.includes(accountId)
    );
    if (filteredAccountIds.length === 0) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }
    return NotificationService.sendEmailNotificationToGroup({
      accountIds: filteredAccountIds,
      content,
      notificationType,
    });
  }

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    await EmailService.sendEmail(params);
  }

  public static async sendSmsNotificationToAccount(
    params: SendSmsNotificationToAccountParams
  ): Promise<void> {
    const { accountId, content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const isSmsEnabled = ConfigService.getValue('sms.enabled');

    if (!isSmsEnabled) {
      Logger.warn(`SMS not enabled. Could not send message - ${content}`);
      return;
    }
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    if (
      !notificationPreference.notificationChannelPreferences.sms ||
      !notificationPreference.notificationTypePreferences[notificationType]
    ) {
      throw new NotificationPermissionDeniedError();
    }
    const accountReference = await AccountService.getAccountById({ accountId });
    if (!accountReference || !accountReference.phoneNumber) {
      throw new BadRequestError(
        `No valid phone number found for accountId ${accountId}`
      );
    }
    const NotificationSmsParams: SendSMSParams = {
      messageBody: content,
      recipientPhone: accountReference.phoneNumber,
    };
    await NotificationService.sendSMS(NotificationSmsParams);
    Logger.info(
      `Successfully sent sms notification to accountId: ${accountId}:`
    );
  }

  public static async sendSmsNotificationToGroup(
    params: SendSmsNotificationToGroupParams
  ): Promise<SMSNotificationResponse> {
    const { accountIds, content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const unsuccessful: string[] = [];
    const smsBatches: SendSMSParams[][] = [];

    await Promise.all(
      accountIds.map(async (accountId) => {
        try {
          const notificationPreference =
            await NotificationReader.getAccountNotificationPreferences(
              accountId
            );
          if (
            !notificationPreference ||
            !notificationPreference.notificationChannelPreferences.sms ||
            !notificationPreference.notificationTypePreferences[
              notificationType
            ]
          ) {
            unsuccessful.push(accountId);
            return;
          }

          const accountReference = await AccountService.getAccountById({
            accountId,
          });
          if (!accountReference || !accountReference.phoneNumber) {
            unsuccessful.push(accountId);
            return;
          }

          const smsParams: SendSMSParams = {
            messageBody: content,
            recipientPhone: accountReference.phoneNumber,
          };

          if (
            !smsBatches.length ||
            smsBatches[smsBatches.length - 1].length >= batchSize
          ) {
            smsBatches.push([]);
          }
          smsBatches[smsBatches.length - 1].push(smsParams);
        } catch (error) {
          unsuccessful.push(accountId);
        }
      })
    );

    // Since Twilio does not support batch SMS sending, we process each batch sequentially
    // and send individual SMS messages within each batch.
    await Promise.all(
      smsBatches.map(async (batch, i) => {
        try {
          await Promise.all(
            batch.map((smsparams) => NotificationService.sendSMS(smsparams))
          );
          Logger.info(
            `Successfully sent batch SMS notifications at batch index: ${i}`
          );
        } catch (error) {
          Logger.error(
            `Failed to send batch SMS notifications at batch index ${i}:`,
            error
          );
        }
      })
    );

    Logger.info(
      `Batch SMS notifications completed. Unsuccessful accounts: ${unsuccessful.length}`
    );
    return { unsuccessful };
  }

  public static async sendSmsNotificationToAll(
    params: SendSmsNotificationToAllParams
  ): Promise<SMSNotificationResponse> {
    const { content } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const isSmsEnabled = ConfigService.getValue('sms.enabled');

    if (!isSmsEnabled) {
      Logger.warn(`SMS not enabled. Could not send message - ${content}`);
      return { unsuccessful: [] };
    }
    const getChannelPreferencesParams = {
      notificationChannelPreferences: { sms: true },
    };
    const accountIdsWithSmsNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationChannelPreferences(
        getChannelPreferencesParams
      );
    const accountsWithNotificationTypeEnabled =
      await NotificationService.getAccountsWithParticularNotificationTypePreferences(
        {
          notificationTypePreferences: { [notificationType]: true },
        }
      );
    const filteredAccountIds = accountIdsWithSmsNotificationEnabled.filter(
      (accountId) => accountsWithNotificationTypeEnabled.includes(accountId)
    );
    if (filteredAccountIds.length === 0) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }
    return NotificationService.sendSmsNotificationToGroup({
      accountIds: filteredAccountIds,
      content,
      notificationType,
    });
  }

  public static async sendSMS(params: SendSMSParams): Promise<MessageInstance> {
    return SmsService.sendSMS(params);
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
    const { accountId } = params;
    const notificationPreference =
      await NotificationReader.getAccountNotificationPreferences(accountId);
    if (!notificationPreference) {
      throw new NotificationPreferencesNotFoundError(accountId);
    }
    const updateNotificationChannelPreferenceParams = {
      accountId,
      notificationChannelPreferences: { push: false },
    };
    await NotificationService.updateAccountNotificationChannelPreferences(
      updateNotificationChannelPreferenceParams
    );
  }

  public static async sendPushNotificationToAccount(
    params: SendPushNotificationToAccountParams
  ): Promise<PushNotificationResponse> {
    const { accountId, title, body, notificationType } = params;
    return NotificationService.sendPushNotificationToGroup({
      accountIds: [accountId],
      title,
      body,
      notificationType,
    });
  }

  public static async sendPushNotificationToGroup(
    params: SendPushNotificationToGroupParams
  ): Promise<PushNotificationResponse> {
    const { accountIds, title, body } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const accountsWithNotificationPreferencesDisabled: string[] = [];
    const pushBatches: { body: string; fcmTokens: string[]; title: string }[] =
      [];
    let unsuccessfulTokens: string[] = [];
    let batchResponse: BatchResponse | null = null;

    await Promise.all(
      accountIds.map(async (accountId) => {
        try {
          const notificationPreference =
            await NotificationReader.getAccountNotificationPreferences(
              accountId
            );

          if (
            !notificationPreference ||
            !notificationPreference.notificationChannelPreferences.push ||
            !notificationPreference.notificationTypePreferences[
              notificationType
            ] ||
            !notificationPreference.fcmTokens ||
            notificationPreference.fcmTokens.length === 0
          ) {
            accountsWithNotificationPreferencesDisabled.push(accountId);
            return;
          }

          notificationPreference.fcmTokens.forEach((token) => {
            if (
              !pushBatches.length ||
              pushBatches[pushBatches.length - 1].fcmTokens.length >= batchSize
            ) {
              pushBatches.push({ fcmTokens: [], title, body });
            }
            pushBatches[pushBatches.length - 1].fcmTokens.push(token);
          });
        } catch (error) {
          accountsWithNotificationPreferencesDisabled.push(accountId);
        }
      })
    );

    await Promise.all(
      pushBatches.map(async (batch, i) => {
        try {
          const { response, unsuccessfulTokens: failedTokens } =
            await PushService.sendBatchPushNotifications(batch);

          if (response) batchResponse = response;
          unsuccessfulTokens = [...unsuccessfulTokens, ...failedTokens];

          Logger.info(
            `Successfully sent batch push notifications at batch index: ${i}:`
          );
        } catch (error) {
          Logger.error(
            `Failed to send batch push notifications at index ${i}:`,
            error
          );
        }
      })
    );

    Logger.info(`Batch push notifications completed.`);
    Logger.info(
      `Notifications that ended unsuccessfully (invalid FCM tokens): ${unsuccessfulTokens.length}`
    );
    Logger.info(
      `Accounts with disabled notification preferences: ${accountsWithNotificationPreferencesDisabled.length}`
    );

    return {
      response: batchResponse,
      unsuccessfulTokens,
      accountsWithNotificationPreferencesDisabled,
    };
  }

  public static async sendPushNotificationToAll(
    params: SendPushNotificationToAllParams
  ): Promise<PushNotificationResponse> {
    const { title, body } = params;
    let { notificationType } = params;
    notificationType = notificationType.toLowerCase();
    if (
      !Object.values(NotificationTypePreferenceEnum).includes(
        notificationType as NotificationTypePreferenceEnum
      )
    ) {
      throw new NotificationTypePreferencesInvalidError();
    }
    const getChannelPreferencesParams = {
      notificationChannelPreferences: { push: true },
    };
    const accountIdsWithPushNotificationEnabled =
      await NotificationService.getAccountsWithParticularNotificationChannelPreferences(
        getChannelPreferencesParams
      );
    const accountsWithNotificationTypeEnabled =
      await NotificationService.getAccountsWithParticularNotificationTypePreferences(
        {
          notificationTypePreferences: { [notificationType]: true },
        }
      );
    const filteredAccountIds = accountIdsWithPushNotificationEnabled.filter(
      (accountId) => accountsWithNotificationTypeEnabled.includes(accountId)
    );
    if (filteredAccountIds.length === 0) {
      throw new AccountsWithParticularNotificationPreferencesNotFoundError();
    }

    return NotificationService.sendPushNotificationToGroup({
      accountIds: filteredAccountIds,
      title,
      body,
      notificationType,
    });
  }

  public static async sendBroadcastNotification(
    params: SendBroadcastNotificationParams
  ): Promise<{
    email: { unsuccessful: string[] };
    push: {
      accountsWithNotificationPreferencesDisabled: string[];
      response: BatchResponse | null;
      unsuccessfulTokens: string[];
    };
    sms: { unsuccessful: string[] };
  }> {
    const { title, body, notificationType } = params;
    const emailResult = await NotificationService.sendEmailNotificationToAll({
      content: body,
      notificationType,
    });
    const smsResult = await NotificationService.sendSmsNotificationToAll({
      content: body,
      notificationType,
    });
    const pushResult = await NotificationService.sendPushNotificationToAll({
      title,
      body,
      notificationType,
    });
    return {
      email: emailResult,
      sms: smsResult,
      push: pushResult,
    };
  }
}
