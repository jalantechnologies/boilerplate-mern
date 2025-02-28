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

  private static getEmailClient(): MailService {
    if (this.emailClient) {
      return this.emailClient;
    }

    mail.setApiKey(ConfigService.getValue('sendgrid.apiKey'));
    this.emailClient = mail;

    return this.emailClient;
  }
}
