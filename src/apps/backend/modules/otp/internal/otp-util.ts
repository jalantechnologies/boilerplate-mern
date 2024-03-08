import _ from 'lodash';

import { ContactNumber, Otp } from '../types';

import { OtpDB } from './store/otp-db';

export default class OtpUtil {
  public static convertOtpDBToOtp(otpDb: OtpDB): Otp {
    const otp = new Otp();
    otp.id = otpDb._id.toString();
    otp.contactNumber = otpDb.contactNumber;
    otp.otpCode = otpDb.otpCode;
    otp.status = otpDb.status;
    return otp;
  }

  public static generateOtp(): string {
    return _.random(1000, 9999).toString(); // 4 digit OTP
  }

  public static getContactNumberString(
    contactNumber: ContactNumber,
  ): string {
    const { countryCode, phoneNumber } = contactNumber;

    return `${countryCode} ${phoneNumber}`;
  }
}
