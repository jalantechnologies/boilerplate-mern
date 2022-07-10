import { SendSMSParams } from '../modules/communication/types';
import SMSParams from '../modules/communication/internals/twilio-params';

export default class TwilioService {
  public static initializeService(): void {
    // eslint-disable-next-line no-console
    console.log('TWILIO MOCK INITIALIZED');
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);
    return await Promise.resolve();
  }
}
