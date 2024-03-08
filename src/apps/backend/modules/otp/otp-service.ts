import CommunicationUtil from '../communication/communication-util';
import { SMSService } from '../communication';

import OtpWriter from './internal/otp-writer';
import {
  ContactNumber,
  Otp,
  OtpRequestError,
} from './types';

export default class OtpService {
  public static async createOtp(
    contactNumber: ContactNumber,
  ): Promise<Otp> {
    const isValidContactNumber = CommunicationUtil.checkPhoneNumberValidation(`${contactNumber.countryCode}${contactNumber.phoneNumber}`);

    if (!isValidContactNumber) {
      throw new OtpRequestError('Invalid contact number');
    }

    const otp = await OtpWriter.createOtp(contactNumber);

    if (!otp) {
      throw new OtpRequestError('Failed to create OTP');
    }

    await SMSService.sendSMS({
      messageBody: `Your OTP is ${otp.otpCode}`,
      recipientPhone: contactNumber,
    });

    return otp;
  }

  public static async verifyOTP(
    contactNumber: ContactNumber,
    otpCode: string,
  ): Promise<Otp> {
    return OtpWriter.verifyOTP(contactNumber, otpCode);
  }
}
