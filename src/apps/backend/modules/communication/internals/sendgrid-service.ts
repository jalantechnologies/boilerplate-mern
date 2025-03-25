import mail, { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';
import { SendEmailParams, ServiceError } from 'backend/modules/communication';
import EmailParams from 'backend/modules/communication/internals/sendgrid-email-params';
import { ConfigService } from 'backend/modules/config';
import _ from 'lodash';

export default class SendGridService {
  private static client: MailService;

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
        domain: ConfigService.getValue<string>('webAppHost'),
      },
    };
    if (params.templateData) {
      _.merge(msg.dynamicTemplateData, params.templateData);
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
