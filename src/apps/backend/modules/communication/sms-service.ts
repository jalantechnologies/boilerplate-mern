import { ConfigService } from '../config';
import { isDefaultPhoneNumber } from '../util/phone-number-util';

import TwilioService from './internals/twilio-service';
import { SendSMSParams } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    const enableSMS = ConfigService.getValue('enableSMS');

    // If SMS is disabled or the recipient phone number is the default phone number, do not send SMS
    if (!enableSMS || isDefaultPhoneNumber(params.recipientPhone.phoneNumber)) {
      return;
    }

    await TwilioService.sendSMS(params);
  }
}
