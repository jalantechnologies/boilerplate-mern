import { SendSMSParams } from '../../src/apps/backend/modules/communication/types';
import SMSParams from '../../src/apps/backend/modules/communication/internals/twilio-params';

export default class TwilioService {
  public static initializeService(): void {}

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);
    return await Promise.resolve();
  }
}
