import SendGridService from './internals/send-grid-service';
import { SendEmailParams } from './types';
import { SendGridEmailParams } from './internals/sendgrid-email-params';
export default class EmailService {
  public static async sendEmail(params: SendEmailParams): Promise<void> {
    const sendGridParams = new SendGridEmailParams(params);
    await sendGridParams.validate();
    return SendGridService.sendEmail(params);
  }
}
