import { SendSMSParams, ThirdPartyServiceError } from '../types';
import { SmsParams } from './twilio-params';
import { Twilio } from 'twilio';
import config from 'config';

export default class TwilioService {
  private static twilio: Twilio;

  public static initializeService() {
    this.twilio = new Twilio(
      config.get('twilio.verify.accountSid'),
      config.get('twilio.verify.authToken'),
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const smsParams = new SmsParams(params);
    const fromNumber: string = config.get('twilio.fromNumber');
    await smsParams.validate();
    try {
      await this.twilio.messages.create({
        to: smsParams.phoneNumberString(),
        from: fromNumber,
        body: smsParams.message
      });
    } catch(e) {
      // Also log error with logger
      throw new ThirdPartyServiceError('');
    }
  }
}
