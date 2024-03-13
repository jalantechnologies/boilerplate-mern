import { PhoneNumber } from '../account/types';
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

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
  EmailBasedAuthAccessTokenRequestParams | OTPBasedAuthAccessTokenRequestParams;

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
