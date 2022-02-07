import { SendSMSParams } from '../types';

export default class TwilioService {
  public static initializeService() {
    // TODO: Initialize Twilio, if applicable, by reading values from ConfigService
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    console.log(params);
    // TODO: Implement this.
  }
}
