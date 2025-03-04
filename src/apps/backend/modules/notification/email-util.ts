import mail, { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';
import _ from 'lodash';

import { ConfigService } from '../config';

import NotificationUtil from './internal/notification-util';
import { SendEmailParams, ServiceError } from './types';

export default class EmailUtil {
  private static emailClient: MailService;

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

  public static async sendBatchEmail(params: {
    emails: SendEmailParams[];
  }): Promise<void> {
    const { emails } = params;
    if (emails.length === 0) return;

    NotificationUtil.validateBatchEmails(emails);

    const messages: MailDataRequired = {
      from: {
        email: ConfigService.getValue<string>('mailer.defaultEmail'),
        name: ConfigService.getValue<string>('mailer.defaultEmailName'),
      },
      personalizations: emails.map(({ recipient, templateData }) => ({
        to: [{ email: recipient.email }],
        dynamicTemplateData: {
          ...templateData,
          domain: ConfigService.getValue<string>('webAppHost'),
        },
      })),
      templateId: emails[0].templateId,
    };

    try {
      const client = this.getEmailClient();
      await client.sendMultiple(messages);
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  private static getEmailClient(): MailService {
    if (this.emailClient) {
      return this.emailClient;
    }

    mail.setApiKey(ConfigService.getValue('sendgrid.apiKey'));
    this.emailClient = mail;

    return this.emailClient;
  }
}
