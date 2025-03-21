import { PhoneNumber } from '../account/types';
import { SMSService } from '../communication';

import OTPUtil from './internal/otp-util';
import OTPWriter from './internal/otp-writer';
import { OTP } from './types';

export default class OTPService {
  public static async createOTP(phoneNumber: PhoneNumber): Promise<OTP> {
    const otp = await OTPWriter.expirePreviousOTPAndCreateNewOTP(phoneNumber);

    if (!OTPUtil.isDefaultPhoneNumber(phoneNumber.phoneNumber)) {
      await SMSService.sendSMS({
        messageBody: `${otp.otpCode} is your one time password to login.`,
        recipientPhone: phoneNumber,
      });
    }

    return otp;
  }

  public static async verifyOTP(
    otpCode: string,
    phoneNumber: PhoneNumber
  ): Promise<OTP> {
    return OTPWriter.verifyOTP(phoneNumber, otpCode);
  }
}
