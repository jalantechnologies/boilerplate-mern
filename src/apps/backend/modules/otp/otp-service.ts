import { PhoneNumber } from '../account';
import { SMSService } from '../communication';
import CommunicationUtil from '../communication/communication-util';

import OtpWriter from './internal/otp-writer';
import {
  Otp,
  OtpRequestError,
} from './types';

export default class OtpService {
  public static async createOtp(
    phoneNumber: PhoneNumber,
  ): Promise<Otp> {
    const isValidPhoneNumber = CommunicationUtil.checkPhoneNumberValidation(phoneNumber.toString());

    if (!isValidPhoneNumber) {
      throw new OtpRequestError('Invalid phone number');
    }

    const otp = await OtpWriter.createOtp(phoneNumber);

    if (!otp) {
      throw new OtpRequestError('Failed to create OTP');
    }

    await SMSService.sendSMS({
      messageBody: `Your OTP is ${otp.otpCode}`,
      recipientPhone: phoneNumber,
    });

    return otp;
  }

  public static async verifyOTP(
    otpCode: string,
    phoneNumber: PhoneNumber,
  ): Promise<Otp> {
    return OtpWriter.verifyOTP(phoneNumber, otpCode);
  }
}
