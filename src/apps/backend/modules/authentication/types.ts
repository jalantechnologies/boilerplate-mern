import { PhoneNumber } from '../account/types';
import { ApplicationError, HttpStatusCodes } from '../application';

export class AccessToken {
  token: string;
  accountId: string;
  expiresAt: Date;
}

export type AccessTokenPayload = {
  accountId: string;
};

export type EmailBasedAuthAccessTokenRequestParams = {
  password: string;
  username: string;
};

export type OTPBasedAuthAccessTokenRequestParams = {
  otpCode: string;
  phoneNumber: PhoneNumber;
};

export type CreateAccessTokenParams =
  | EmailBasedAuthAccessTokenRequestParams
  | OTPBasedAuthAccessTokenRequestParams;

export type VerifyAccessTokenParams = {
  token: string;
};

export enum AccessTokenErrorCode {
  UNAUTHORIZED_ACCESS = 'ACCESS_TOKEN_ERR_01',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_ERR_02',
  AUTHORIZATION_HEADER_NOT_FOUND = 'ACCESS_TOKEN_ERR_03',
  INVALID_AUTHORIZATION_HEADER = 'ACCESS_TOKEN_ERR_04',
  ACCESS_TOKEN_INVALID = 'ACCESS_TOKEN_ERR_05',
}

export class AccessTokenInvalidError extends ApplicationError {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is invalid. Please request a new one.');
    this.code = AccessTokenErrorCode.ACCESS_TOKEN_INVALID;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class AccessTokenExpiredError extends ApplicationError {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is expired. Please request a new one.');
    this.code = AccessTokenErrorCode.ACCESS_TOKEN_EXPIRED;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class AuthorizationHeaderNotFound extends ApplicationError {
  code: AccessTokenErrorCode;

  constructor() {
    super('No authorization header found.');
    this.code = AccessTokenErrorCode.AUTHORIZATION_HEADER_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class InvalidAuthorizationHeader extends ApplicationError {
  code: AccessTokenErrorCode;

  constructor() {
    super('Invalid authorization header. Expected format is "Bearer <token>".');
    this.code = AccessTokenErrorCode.INVALID_AUTHORIZATION_HEADER;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class UnAuthorizedAccessError extends ApplicationError {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is not authorized to access the given resource');
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

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

export class PasswordResetToken {
  id: string;
  account: string;
  expiresAt: Date;
  isExpired: boolean;
  token: string;
  isUsed: boolean;
}

export type CreatePasswordResetTokenParams = {
  username: string;
};

export enum PasswordResetTokenErrorCode {
  PASSWORD_RESET_TOKEN_NOT_FOUND = 'PASSWORD_RESET_TOKEN_ERR_01',
  PASSWORD_RESET_EMAIL_NOT_ENABLED_FOR_THE_ENVIRONMENT = 'PASSWORD_RESET_TOKEN_ERR_02',
}
export class PasswordResetTokenEmailNotEnabledForTheEnvironmentError extends ApplicationError {
  code: PasswordResetTokenErrorCode;

  constructor() {
    super('Password reset token is not enabled for the environment.');
    this.code =
      PasswordResetTokenErrorCode.PASSWORD_RESET_EMAIL_NOT_ENABLED_FOR_THE_ENVIRONMENT;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class PasswordResetTokenNotFoundError extends ApplicationError {
  code: PasswordResetTokenErrorCode;

  constructor(account: string) {
    super(`System is unable to find a token with accountId ${account}.`);
    this.code = PasswordResetTokenErrorCode.PASSWORD_RESET_TOKEN_NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
