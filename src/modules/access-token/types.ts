// eslint-disable-next-line max-classes-per-file
export class AccessToken {
  accountId: string;

  expiresAt?: Date;

  token: string;
}

export type CreateAccessTokenParams = {
  accountId: string;
};

export enum AccessTokenErrorCode {
  UNAUTHORIZED_ACCESS = 'ACCESS_TOKEN_ERR_01',
  ACCESS_TOKEN_EXPIRED = 'ACCESS_TOKEN_ERR_02',
}

export class AccessTokenExpiredError extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is expired. Please request a new one.');
    this.code = AccessTokenErrorCode.ACCESS_TOKEN_EXPIRED;
  }
}

export class UnAuthorizedAccessError extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is not authorized to access the given resource');
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
  }
}
