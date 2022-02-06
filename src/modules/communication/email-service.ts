import SendGridService from './internals/send-grid-service';
import { SendEmailParams } from './types';

export default class EmailService {
  public static async sendEmail(params: SendEmailParams): Promise<void> {
    return SendGridService.sendEmail(params);
  }
}
