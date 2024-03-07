import { Twilio } from 'twilio';

import { ConfigService } from '../../config';
import {
  SendSMSParams,
  ServiceError,
  VerifyOtpResponse,
  VerifyOtpResponseStatus,
} from '../types';

import SMSParams from './twilio-params';
import {
  VerificationInstance,
  VerificationListInstanceCreateOptions,
} from 'twilio/lib/rest/verify/v2/service/verification';
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck';
import { Logger } from '../../logger';

export default class TwilioService {
  private static client: Twilio;

  public static async sendSMS(params: SendSMSParams): Promise<void> {
    SMSParams.validate(params);

    try {
      const client = this.getClient();

      await client.messages.create({
        to: SMSParams.phoneNumberToString(params.recipientPhone),
        messagingServiceSid: ConfigService.getValue(
          'twilio.messaging.messagingServiceSid',
        ),
        body: params.messageBody,
      });
    } catch (err) {
      throw new ServiceError(err as Error);
    }
  }

  private static getClient(): Twilio {
    if (this.client) {
      return this.client;
    }

    this.client = new Twilio(
      ConfigService.getValue('twilio.verify.accountSid'),
      ConfigService.getValue('twilio.verify.authToken'),
    );
    return this.client;
  }

  public static async sendOTP(contactNumber: string): Promise<VerificationInstance> {
    try {
      const client = this.getClient();

      const otpBody: VerificationListInstanceCreateOptions = {
        to: contactNumber,
        channel: 'sms',
      };

      return await client.verify.v2
        .services(ConfigService.getValue('twilio.verify.verifySid'))
        .verifications.create(otpBody);
    } catch (e) {
      Logger.error(e.message);
      throw e;
    }
  }

  public static async verifyOTP(contactNumber: string, otp: string): Promise<VerifyOtpResponse> {
    const client = this.getClient();
    let isOTPVerified: VerifyOtpResponseStatus = VerifyOtpResponseStatus.FAILURE;
    let responseMessage: string;

    try {
      const response: VerificationCheckInstance = await client.verify.v2
        .services(ConfigService.getValue('twilio.verify.verifySid'))
        .verificationChecks.create({ to: contactNumber, code: otp });

      if (response.status === 'approved') {
        isOTPVerified = VerifyOtpResponseStatus.SUCCESS;
        responseMessage = 'OTP verified successfully';
      } else {
        responseMessage = 'Incorrect OTP';
      }
    } catch (e) {
      if (e.code === 60202) {
        responseMessage = 'Maximum attempts to verify OTP reached. Please try after some time.';
      } else if (e.code === 20404) {
        responseMessage = 'OTP is expired. Please generate new OTP and try again.';
      } else {
        Logger.error(e);
        responseMessage = e.message as string;
      }
    }

    const verifyOtpResponse: VerifyOtpResponse = {
      responseMessage,
      status: isOTPVerified,
    };
    return verifyOtpResponse;
  }
}
