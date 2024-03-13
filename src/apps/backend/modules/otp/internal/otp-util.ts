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

  public static generateOtp(length: number): string {
    let otp = '';
    for (let i = 0; i < length; i += 1) {
      otp += _.random(0, 9);
    }
    return otp;
  }
}
