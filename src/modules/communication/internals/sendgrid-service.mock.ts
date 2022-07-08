import { SendEmailParams } from '../types';
import EmailParams from './sendgrid-email-params';

export default class SendGridServiceMock {
  public static initializeService(): void {}

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    EmailParams.validate(params);
    return Promise.resolve();
  }
}
