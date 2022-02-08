import { Twilio } from 'twilio';
import { SendSMSParams, ThirdPartyServiceError } from '../types';
import SmsParams from './twilio-params';
import ConfigService from '../../config/config-service';

export default class TwilioService {
  private static twilio: Twilio;

  private static accountSid: string;

  private static authToken: string;

  private static fromNumber: string;

  public static initializeService(): void {
    this.accountSid = ConfigService.getStringValue('twilio.verify.accountSid');
    this.authToken = ConfigService.getStringValue('twilio.verify.authToken');
    this.fromNumber = ConfigService.getStringValue('twilio.fromNumber');
    this.twilio = new Twilio(
      this.accountSid,
      this.authToken,
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const smsParams = new SmsParams(params);
    smsParams.validate();
    try {
      await this.twilio.messages.create({
        to: smsParams.phoneNumberString(),
        from: this.fromNumber,
        body: smsParams.message,
      });
    } catch (e) {
      throw new ThirdPartyServiceError('Service unavailable, please try after sometime !.');
    }
  }
}
