import { PhoneNumber } from '../../../account';
import {
  OTP,
  OTPExpiredError,
  OTPIncorrectError,
  OTPStatus,
} from '../../types';

import OTPUtil from './otp-util';
import OTPRepository from './store/otp-repository';

export default class OTPWriter {
  public static async expirePreviousOTPAndCreateNewOTP(
    phoneNumber: PhoneNumber
  ): Promise<OTP> {
    const previousOTPDb = await OTPRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      active: true,
    });

    if (previousOTPDb) {
      previousOTPDb.status = OTPStatus.EXPIRED;
      previousOTPDb.active = false;
      await previousOTPDb.save();
    }

    const otp = OTPUtil.getOTP(phoneNumber.phoneNumber);

    const otpDb = await OTPRepository.create({
      active: true,
      otpCode: otp,
      phoneNumber,
      status: OTPStatus.PENDING,
    });

    return OTPUtil.convertOTPDBToOTP(otpDb);
  }

  public static async verifyOTP(
    phoneNumber: PhoneNumber,
    otpCode: string
  ): Promise<OTP> {
    const otpDb = await OTPRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      otpCode,
    }).sort({
      createdAt: -1,
    });

    if (!otpDb) {
      throw new OTPIncorrectError();
    }

    if (otpDb.active === false) {
      throw new OTPExpiredError();
    }

    otpDb.status = OTPStatus.SUCCESS;
    otpDb.active = false;
    await otpDb.save();

    return OTPUtil.convertOTPDBToOTP(otpDb);
  }
}
