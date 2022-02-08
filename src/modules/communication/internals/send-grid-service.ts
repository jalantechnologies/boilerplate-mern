import { SendEmailParams, ThirdPartyServiceError } from '../types';
import { EmailParams } from './sendgrid-email-params';
import mail from '@sendgrid/mail';
import ConfigService from '../../config/config-service';

export default class SendGridService {

  private static sendgridAPIKey: string;
  private static domain: string;

  public static initializeService() {
    this.sendgridAPIKey = ConfigService.getStringValue('sendgrid.apiKey');
    this.domain = ConfigService.getStringValue('webAppHost');
    mail.setApiKey(this.sendgridAPIKey);
  }

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    const sendGridParams = new EmailParams(params);
    const msg: any = {
      to: params.to,
      from: {
        email: params.from,
        name: params.fromName,
      }
    };
    await sendGridParams.validate();
    msg.templateId = params.templateId;
    msg.dynamic_template_data = params.templateData;
    msg.dynamic_template_data = Object.assign(msg.dynamic_template_data, {
      domain: this.domain,
    });
    try {
      await mail.send(msg);
    } catch(e) {
      throw new ThirdPartyServiceError('Service unavailable, please try after sometime !.');
    }
  }
};
