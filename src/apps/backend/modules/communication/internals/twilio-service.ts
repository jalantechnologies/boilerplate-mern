import { SendSMSParams, ServiceError } from 'backend/modules/communication';
import SMSParams from 'backend/modules/communication/internals/twilio-params';
import { ConfigService } from 'backend/modules/config';
import { Twilio } from 'twilio';

export default class TwilioService {
  private static client: Twilio;

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);

    try {
      const client = this.getClient();

      await client.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getValue(
          'twilio.messaging.messagingServiceSid'
        ),
        body: params.messageBody,
      });
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  private static getClient(): Twilio {
    if (this.client) {
      return this.client;
    }

    this.client = new Twilio(
      ConfigService.getValue('twilio.verify.accountSid'),
      ConfigService.getValue('twilio.verify.authToken')
    );
    return this.client;
  }
}
