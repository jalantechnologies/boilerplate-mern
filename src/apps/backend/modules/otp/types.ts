import { PhoneNumber } from '../account/types';
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export enum OtpStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export class Otp {
  id: string;
  otpCode: string;
  phoneNumber: PhoneNumber;
  status: OtpStatus;
}

export enum OtpErrorCode {
  INCORRECT_OTP = 'OTP_ERR_01',
  OTP_EXPIRED = 'OTP_ERR_02',
  REQUEST_FAILED = 'OTP_ERR_03',
}

export type CreateOTPParams = {
  phoneNumber: PhoneNumber;
};

export type VerifyOTPParams = {
  otpCode: string;
  phoneNumber: PhoneNumber;
};

export class OtpIncorrectError extends ApplicationError {
  code: OtpErrorCode;

  constructor() {
    super('Please provide the correct OTP to login.');
    this.code = OtpErrorCode.INCORRECT_OTP;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class OtpExpiredError extends ApplicationError {
  code: OtpErrorCode;

  constructor() {
    super('OTP has expired. Please request a new OTP.');
    this.code = OtpErrorCode.OTP_EXPIRED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class OtpRequestError extends ApplicationError {
  code: OtpErrorCode;

  constructor(message: string) {
    super(message);
    this.code = OtpErrorCode.REQUEST_FAILED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
