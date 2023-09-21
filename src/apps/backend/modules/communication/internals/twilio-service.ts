import { Twilio } from 'twilio';

import { ConfigService } from '../../config';
import { SendSMSParams, ServiceError } from '../types';

import SMSParams from './twilio-params';

export default class TwilioService {
  private static client: Twilio;

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);

    try {
      const client = this.getClient();

      await client.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getValue(
          'twilio.messaging.messagingServiceSid',
        ),
        body: params.messageBody,
      });
    } catch (e) {
      throw new ServiceError(e);
    }
  }

  private static getClient(): Twilio {
    if (this.client) {
      return this.client;
    }

    this.client = new Twilio(
      ConfigService.getValue('twilio.verify.accountSid'),
      ConfigService.getValue('twilio.verify.authToken'),
    );
    return this.client;
  }
}
