import { SendSMSParams } from '../../src/modules/communication/types';
import SMSParams from '../../src/modules/communication/internals/twilio-params';

export default class TwilioService {
  public static initializeService(): void {
    console.log('TWILIO MOCK INITIALIZED');
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);
    return await Promise.resolve();
  }
}
