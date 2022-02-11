import { Twilio } from 'twilio';
import ConfigService from '../../config/config-service';
import Logger from '../../logger/logger';
import { SendSMSParams, ThirdPartyServiceError } from '../types';
import SMSParams from './twilio-params';

export default class TwilioService {
  private static twilio: Twilio;

  public static initializeService(): void {
    this.twilio = new Twilio(
      ConfigService.getStringValue('twilio.verify.accountSid'),
      ConfigService.getStringValue('twilio.verify.authToken'),
    );
  }

  public static async sendSMS(params: SendSMSParams):Promise<void> {
    SMSParams.validate(params);
    try {
      await this.twilio.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getStringValue('twilio.messaging.messagingServiceSid'),
        body: params.messageBody,
      });
    } catch (e) {
      Logger.error(e.message);
      throw new ThirdPartyServiceError('SMS service unavailable.');
    }
  }
}
