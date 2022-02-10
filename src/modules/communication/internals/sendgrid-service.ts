import mail, { MailDataRequired } from '@sendgrid/mail';
import { SendEmailParams, ThirdPartyServiceError } from '../types';
import ConfigService from '../../config/config-service';
import EmailParams from './sendgrid-email-params';

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
        domain: ConfigService.getStringValue('webAppHost'),
      },
    };

    try {
      await mail.send(msg);
    } catch (e) {
      throw new ThirdPartyServiceError('Email service unavailable.');
    }
  }
}
