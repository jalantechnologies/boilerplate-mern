import { SendEmailParams } from '../../src/modules/communication/types';
import EmailParams from '../../src/modules/communication/internals/sendgrid-email-params';

export default class SendGridService {
  public static initializeService(): void {}

  public static async sendEmail(params: SendEmailParams): Promise<void> {
    EmailParams.validate(params);
    return await Promise.resolve();
  }
}
