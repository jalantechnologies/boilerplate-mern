import { PhoneNumber } from '../account/types';
import { SMSService } from '../communication';
import { isDefaultPhoneNumber } from '../util/phone-number-util';

import OtpWriter from './internal/otp-writer';
import {
  Otp,
} from './types';

export default class OtpService {
  public static async createOtp(
    phoneNumber: PhoneNumber,
  ): Promise<Otp> {
    const otp = await OtpWriter.expirePreviousOtpAndCreateNewOtp(phoneNumber);

    if (!isDefaultPhoneNumber(phoneNumber.phoneNumber)) {
      await SMSService.sendSMS({
        messageBody: `${otp.otpCode} is your one time password to login.`,
        recipientPhone: phoneNumber,
      });
    }

    return otp;
  }

  public static async verifyOTP(
    otpCode: string,
    phoneNumber: PhoneNumber,
  ): Promise<Otp> {
    return OtpWriter.verifyOTP(phoneNumber, otpCode);
  }
}
