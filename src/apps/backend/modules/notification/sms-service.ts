import { Twilio } from 'twilio';
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message';

import { ConfigService } from '../config';

import NotificationUtil from './internal/notification-util';
import { SendSMSParams, ServiceError } from './types';

export default class SMSService {
  private static smsClient: Twilio;

  public static async sendSMS(params: SendSMSParams): Promise<MessageInstance> {
    NotificationUtil.validateSms(params);

    try {
      const client = this.getSmsClient();

      return await client.messages.create({
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
