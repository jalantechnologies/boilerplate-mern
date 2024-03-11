import { PhoneNumber } from '../../account/types';
import { OTP_LENGTH } from '../constants';
import {
  Otp,
  OtpExpiredError,
  OtpIncorrectError,
  OtpStatus,
} from '../types';

import OtpUtil from './otp-util';
import OtpRepository from './store/otp-repository';

export default class OtpWriter {
  public static async expirePreviousOtpAndCreateNewOtp(
    phoneNumber: PhoneNumber,
  ): Promise<Otp> {
    const previousOtpDb = await OtpRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      active: true,
    });

    if (previousOtpDb) {
      previousOtpDb.status = OtpStatus.EXPIRED;
      previousOtpDb.active = false;
      await previousOtpDb.save();
    }

    const otpDb = await OtpRepository.create({
      active: true,
      otpCode: OtpUtil.generateOtp(OTP_LENGTH),
      phoneNumber,
      status: OtpStatus.PENDING,
    });

    return OtpUtil.convertOtpDBToOtp(otpDb);
  }

  public static async verifyOTP(
    phoneNumber: PhoneNumber,
    otpCode: string,
  ): Promise<Otp> {
    const otpDb = await OtpRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
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
