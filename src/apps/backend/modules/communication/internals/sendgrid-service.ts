import mail, { MailDataRequired } from '@sendgrid/mail';
import { MailService } from '@sendgrid/mail/src/mail';
import _ from 'lodash';
import { SendEmailParams, ServiceError } from 'modules/communication';
import EmailParams from 'modules/communication/internals/sendgrid-email-params';
import { ConfigService } from 'modules/config';

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
