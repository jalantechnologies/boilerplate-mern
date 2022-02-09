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
}

export class UnAuthorizedAccessError extends Error {
  code: AccessTokenErrorCode;

  constructor() {
    super('This token is not authorized to access to given resource');
    this.code = AccessTokenErrorCode.UNAUTHORIZED_ACCESS;
  }
}
