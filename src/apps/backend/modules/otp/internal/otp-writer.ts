import {
  ContactNumber,
  Otp,
  OtpExpiredError,
  OtpIncorrectError,
  OtpStatus,
} from '../types';

import OtpUtil from './otp-util';
import OtpRepository from './store/otp-repository';

export default class OtpWriter {
  public static async createOtp(
    contactNumber: ContactNumber,
  ): Promise<Otp> {
    const otpDb = await OtpRepository.create({
      active: true,
      contactNumber,
      otpCode: OtpUtil.generateOtp(),
      status: OtpStatus.PENDING,
    });

    return OtpUtil.convertOtpDBToOtp(otpDb);
  }

  public static async verifyOTP(
    contactNumber: ContactNumber,
    otpCode: string,
  ): Promise<Otp> {
    const otpDb = await OtpRepository.findOne({
      'contactNumber.countryCode': contactNumber.countryCode,
      'contactNumber.phoneNumber': contactNumber.phoneNumber,
      otpCode,
    });

    if (!otpDb) {
      throw new OtpIncorrectError();
    }

    if (otpDb.active === false) {
      throw new OtpExpiredError();
    }

    otpDb.status = OtpStatus.SUCCESS;
    otpDb.active = false;
    await otpDb.save();

    return OtpUtil.convertOtpDBToOtp(otpDb);
  }
}
