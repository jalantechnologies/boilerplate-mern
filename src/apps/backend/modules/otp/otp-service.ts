import {
  ContactNumber,
  Otp,
  OtpRequestError,
} from './types';
import OtpWriter from './internal/otp-writer';
import TwilioService from '../communication/internals/twilio-service';

export default class OtpService {
  public static async createOtp(
    contactNumber: ContactNumber,
  ): Promise<Otp> {
    const otp = await OtpWriter.createOtp(contactNumber);

    if (!otp) {
      throw new OtpRequestError('Failed to create OTP');
    }

    await TwilioService.sendSMS({
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
