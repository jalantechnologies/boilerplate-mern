import { Twilio } from 'twilio';

import { ConfigService } from '../config';

import NotificationUtil from './internal/notification-util';
import { SendSMSParams, ServiceError } from './types';

export default class SMSService {
  private static smsClient: Twilio;

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    NotificationUtil.validateSms(params);

    try {
      const client = this.getSmsClient();

      await client.messages.create({
        to: NotificationUtil.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getValue(
          'twilio.messaging.messagingServiceSid'
        ),
        body: params.messageBody,
      });
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  private static getSmsClient(): Twilio {
    if (this.smsClient) {
      return this.smsClient;
    }

    this.smsClient = new Twilio(
      ConfigService.getValue('twilio.verify.accountSid'),
      ConfigService.getValue('twilio.verify.authToken')
    );
    return this.smsClient;
  }
}
