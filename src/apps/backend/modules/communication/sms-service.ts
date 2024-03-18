import { ConfigService } from '../config';

import TwilioService from './internals/twilio-service';
import { SendSMSParams } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const enableSMS = ConfigService.getValue('enableSMS');

    if (!enableSMS) {
      return;
    }

    await TwilioService.sendSMS(params);
  }
}
