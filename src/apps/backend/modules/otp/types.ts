import { PhoneNumber } from '../account/types';
import { ApplicationError, HttpStatusCodes } from '../application';

export enum OTPStatus {
  EXPIRED = 'EXPIRED',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
}

export class OTP {
  id: string;
  otpCode: string;
  phoneNumber: PhoneNumber;
  status: OTPStatus;
}

export enum OTPErrorCode {
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

export class OTPIncorrectError extends ApplicationError {
  code: OTPErrorCode;

  constructor() {
    super('Please provide the correct OTP to login.');
    this.code = OTPErrorCode.INCORRECT_OTP;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class OTPExpiredError extends ApplicationError {
  code: OTPErrorCode;

  constructor() {
    super('OTP has expired. Please request a new OTP.');
    this.code = OTPErrorCode.OTP_EXPIRED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class OTPRequestError extends ApplicationError {
  code: OTPErrorCode;

  constructor(message: string) {
    super(message);
    this.code = OTPErrorCode.REQUEST_FAILED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
