// eslint-disable-next-line max-classes-per-file
export class AccessToken {
  accountId: string;

  expiresAt?: Date;

  token: string;
}

export type CreateAccessTokenParams = {
  username: string;
  password: string;
};

export enum AccessTokenErrorCode {
  UNAUTHORIZED_ACCESS = 'ACCESS_TOKEN_ERR_01',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_ERR_02',
  AUTHORIZATION_HEADER_NOT_FOUND = 'ACCESS_TOKEN_ERR_03',
  INVALID_AUTHORIZATION_HEADER = 'ACCESS_TOKEN_ERR_04',
}

export class AccessTokenExpiredError extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is expired. Please request a new one.');
    this.code = AccessTokenErrorCode.ACCESS_TOKEN_EXPIRED;
  }
}

export class AuthorizationHeaderNotFound extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('No authorization header found.');
    this.code = AccessTokenErrorCode.AUTHORIZATION_HEADER_NOT_FOUND;
  }
}

export class InvalidAuthorizationHeader extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('Invalid authorization header. Expected format is "Bearer <token>".');
    this.code = AccessTokenErrorCode.INVALID_AUTHORIZATION_HEADER;
  }
}

export class UnAuthorizedAccessError extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is not authorized to access the given resource');
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
  }
}
