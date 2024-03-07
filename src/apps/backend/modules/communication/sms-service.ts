import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification';

import CommunicationUtil from './communication-util';
import TwilioService from './internals/twilio-service';
import { SendSMSParams, VerifyOtpResponse } from './types';

export default class SMSService {
  public static async sendSMS(params: SendSMSParams): Promise<void> {
    return TwilioService.sendSMS(params);
  }

  public static async sendOTP(contactNumber: string): Promise<VerificationInstance> {
    CommunicationUtil.validatePhoneNumber(contactNumber);
    return TwilioService.sendOTP(contactNumber);
  }

  public static async verifyOTP(contactNumber: string, otp: string): Promise<VerifyOtpResponse> {
    return TwilioService.verifyOTP(contactNumber, otp);
  }
}
