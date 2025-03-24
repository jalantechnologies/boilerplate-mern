import { OTP_LENGTH, OTP } from 'backend/modules/authentication';
import { OTPDB } from 'backend/modules/authentication/internals/otp/store/otp-db';
import { ConfigService } from 'backend/modules/config';
import _ from 'lodash';

export default class OTPUtil {
  public static convertOTPDBToOTP(otpDb: OTPDB): OTP {
    const otp = new OTP();
    otp.id = otpDb._id.toString();
    otp.phoneNumber = otpDb.phoneNumber;
    otp.otpCode = otpDb.otpCode;
    otp.status = otpDb.status;
    return otp;
  }

  public static generateOTP(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i += 1) {
      otp += _.random(0, 9);
    }
    return otp;
  }

  public static getOTP(phoneNumber: string): string {
    if (
      ConfigService.hasValue('otp.defaultOTP') &&
      OTPUtil.isDefaultPhoneNumber(phoneNumber)
    ) {
      return ConfigService.getValue<string>('otp.defaultOTP');
    }
    return OTPUtil.generateOTP(OTP_LENGTH);
  }

  public static isDefaultPhoneNumber(phoneNumber: string): boolean {
    return (
      ConfigService.hasValue('otp.defaultPhoneNumber') &&
      ConfigService.getValue<string>('otp.defaultPhoneNumber') === phoneNumber
    );
  }
}
