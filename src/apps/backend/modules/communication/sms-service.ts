import { SendSMSParams } from 'backend/modules/communication';
import TwilioService from 'backend/modules/communication/internals/twilio-service';
import { ConfigService } from 'backend/modules/config';
import { Logger } from 'backend/modules/logger';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const isSmsEnabled = ConfigService.getValue('sms.enabled');

    if (!isSmsEnabled) {
      Logger.warn(
        `SMS not enabled. Could not send message - ${params.messageBody}`
      );
      return;
    }

    await TwilioService.sendSMS(params);
  }
}
