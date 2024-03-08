import TwilioService from './internals/twilio-service';
import { SendSMSParams } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    return TwilioService.sendSMS(params);
  }
}
