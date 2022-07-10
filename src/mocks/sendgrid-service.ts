import { SendEmailParams } from '../modules/communication/types';
import EmailParams from '../modules/communication/internals/sendgrid-email-params';

export default class SendGridService {
  public static initializeService(): void {
    // eslint-disable-next-line no-console
    console.log('SENDGRID MOCK INITIALIZED');
  }

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    EmailParams.validate(params);
    return await Promise.resolve();
  }
}
