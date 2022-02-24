import mail, { MailDataRequired } from '@sendgrid/mail';
import { SendEmailParams, ThirdPartyServiceError } from '../types';
import ConfigService from '../../config/config-service';
import EmailParams from './sendgrid-email-params';
import Logger from '../../logger/logger';

export default class SendGridService {
  public static initializeService(): void {
    mail.setApiKey(
      ConfigService.getStringValue('sendgridApiKey'),
    );
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
      ) {
        Logger.error(e.message);
      }
      throw new ThirdPartyServiceError('Email service unavailable.');
    }
  }
}
