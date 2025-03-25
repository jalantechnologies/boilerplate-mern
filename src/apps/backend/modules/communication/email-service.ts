import { SendEmailParams } from 'backend/modules/communication';
import SendGridService from 'backend/modules/communication/internals/sendgrid-service';

export default class EmailService {
  public static async sendEmail(params: SendEmailParams): Promise<void> {
    return SendGridService.sendEmail(params);
  }
}
