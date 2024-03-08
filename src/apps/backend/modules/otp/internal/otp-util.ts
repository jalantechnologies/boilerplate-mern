import _ from 'lodash';

import { Otp } from '../types';

import { OtpDB } from './store/otp-db';

export default class OtpUtil {
  public static convertOtpDBToOtp(otpDb: OtpDB): Otp {
    const otp = new Otp();
    otp.id = otpDb._id.toString();
    otp.phoneNumber = otpDb.phoneNumber;
    otp.otpCode = otpDb.otpCode;
    otp.status = otpDb.status;
    return otp;
  }

  public static generateOtp(): string {
    return _.random(1000, 9999).toString(); // 4 digit OTP
  }
}
