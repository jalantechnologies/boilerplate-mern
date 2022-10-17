import mail, { MailDataRequired } from '@sendgrid/mail';

import ConfigService from '../../config/config-service';
import Logger from '../../logger/logger';
import { SendEmailParams, ThirdPartyServiceError } from '../types';

import EmailParams from './sendgrid-email-params';

export default class SendGridService {
  public static initializeService(): void {
    mail.setApiKey(ConfigService.getStringValue('sendgridApiKey'));
  }

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    EmailParams.validate(params);
    const msg: MailDataRequired = {
      to: params.recipient.email,
      from: {
        email: params.sender.email,
        name: params.sender.name,
      },
      templateId: params.templateId,
      dynamicTemplateData: {
        ...params.templateData,
        domain: ConfigService.getStringValue('webAppHost'),
      },
    };

    try {
      await mail.send(msg);
    } catch (e) {
      if (
        e.code === 429 // Too many requests
        || e.code === 401 // Authentication error (If SG API key is not valid.)
        || e.code === 403 // From address does not match verified sender identity.
      ) {
        Logger.error(e.message);
      }
      throw new ThirdPartyServiceError('Email service unavailable.');
    }
  }
}
