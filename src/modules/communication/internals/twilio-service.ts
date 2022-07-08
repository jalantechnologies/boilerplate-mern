import { Twilio } from 'twilio';
import ConfigService from '../../config/config-service';
import Logger from '../../logger/logger';
import { SendSMSParams, ThirdPartyServiceError } from '../types';
import SMSParams from './twilio-params';

export default class TwilioService {
  private static mock: boolean;
  private static twilio: Twilio;

  public static initializeService(mockMode: boolean): void {
    this.mock = mockMode;

    if (this.mock) return;

    this.twilio = new Twilio(
      ConfigService.getStringValue('twilio.verify.accountSid'),
      ConfigService.getStringValue('twilio.verify.authToken'),
    );
  }

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);

    if (this.mock) return Promise.resolve(null);

    try {
      await this.twilio.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getStringValue(
          'twilio.messaging.messagingServiceSid',
        ),
        body: params.messageBody,
      });
    } catch (e) {
      if (
        e.code === 21705 || // If messaging service sid is invalid
        e.code === 20429 || // Too many requests
        e.code === 20003 || // If Twilio account balance runs out.
        e.code === 30002 // If twilio account suspended
      ) {
        Logger.error(e.message);
      }
      throw new ThirdPartyServiceError('SMS service unavailable.');
    }
  }
}
