import { MissingConfigVariable, SendEmailParams, ThirdPartyServiceError } from '../types';
import { EmailParams } from './sendgrid-email-params';
import config from 'config';
import mail from '@sendgrid/mail';

export default class SendGridService {
  public static initializeService() {
    const sendgridAPIKey:string = config.get('sendgridAPIKey'); // Todo: here use configuration service to get these details.
    if(!sendgridAPIKey) {
      throw new MissingConfigVariable('sendgridAPIKey');
    }
  }
  public static async sendEmail(params: SendEmailParams): Promise<void> {
    const sendGridParams = new EmailParams(params);
    await sendGridParams.validate();
    const msg: any = {
      to: params.to,
      from: {
        email: params.from,
        name: params.fromName,
      }
    };
    msg.templateId = params.templateId;
    msg.dynamic_template_data = params.templateData;
    msg.dynamic_template_data = Object.assign(msg.dynamic_template_data, {
      domain: config.get('webAppHost'),
    });
    try {
      await mail.send(msg);
    } catch(e) {
      // Todo: Also log the error with logger
      throw new ThirdPartyServiceError();
    }
  }
}
