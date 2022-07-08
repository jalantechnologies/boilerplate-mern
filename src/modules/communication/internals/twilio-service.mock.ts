import { SendSMSParams } from '../types';
import SMSParams from './twilio-params';

export default class TwilioServiceMock {
  public static initializeService(): void {}

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);
    return Promise.resolve();
  }
}
