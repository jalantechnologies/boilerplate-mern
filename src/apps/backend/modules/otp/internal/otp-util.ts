import _ from 'lodash';

import { ConfigService } from '../../config';
import { isDefaultPhoneNumber } from '../../util/phone-number-util';
import { OTP_LENGTH } from '../constants';
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

  public static getOtp(phoneNumber: string): string {
    const isProdEnv = process.env.NODE_ENV === 'production';

    // If the phone number is the default phone number in production or if we are in a
    // non-production environment and the default OTP is set in the config, return the default OTP
    if (
      (isProdEnv && isDefaultPhoneNumber(phoneNumber))
      || (!isProdEnv && ConfigService.hasValue('defaultOTP'))
    ) {
      return ConfigService.getValue<string>('defaultOTP');
    }
    return OtpUtil.generateOtp(OTP_LENGTH);
  }
}
