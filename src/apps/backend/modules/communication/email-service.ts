import { SendEmailParams } from 'modules/communication';
import SendGridService from 'modules/communication/internals/sendgrid-service';

export default class EmailService {
  public static async sendEmail(params: SendEmailParams): Promise<void> {
    return SendGridService.sendEmail(params);
  }
}
