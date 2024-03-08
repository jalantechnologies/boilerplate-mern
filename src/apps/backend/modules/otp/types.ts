import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export type ContactNumber = {
  countryCode: string;
  phoneNumber: string;
};

export enum OtpStatus {
  FAILURE = 'FAILURE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export class Otp {
  contactNumber: ContactNumber;
  id: string;
  otpCode: string;
  status: OtpStatus;
}

export enum OtpErrorCode {
  INCORRECT_OTP = 'OTP_ERR_01',
  OTP_EXPIRED = 'OTP_ERR_02',
  FAILED_TO_CREATE_OTP = 'OTP_ERR_03',
}

export type CreateOTPParams = {
  contactNumber: ContactNumber;
};

export type VerifyOTPParams = {
  contactNumber: ContactNumber;
  otpCode: string;
};

export class OtpIncorrectError extends ApplicationError {
  code: OtpErrorCode;

  constructor() {
    super('Incorrect OTP.');
    this.code = OtpErrorCode.INCORRECT_OTP;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class OtpExpiredError extends ApplicationError {
  code: OtpErrorCode;

  constructor() {
    super('OTP has expired. Please request a new OTP.');
    this.code = OtpErrorCode.OTP_EXPIRED;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class OtpRequestError extends ApplicationError {
  code: OtpErrorCode;

  constructor(message: string) {
    super(message);
    this.code = OtpErrorCode.FAILED_TO_CREATE_OTP;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}
