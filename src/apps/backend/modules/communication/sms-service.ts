import { ConfigService } from '../config';
import { Logger } from '../logger';

import TwilioService from './internals/twilio-service';
import { SendSMSParams } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const isSmsEnabled = ConfigService.getValue('sms.enabled');

    if (!isSmsEnabled) {
      Logger.warn(`SMS not enabled. Could not send message - ${params.messageBody}`);
      return;
    }

    await TwilioService.sendSMS(params);
  }
}
