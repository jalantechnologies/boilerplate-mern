import { Account } from '../account/types';
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class PasswordResetToken {
  _id: string;
  account: Account;
  expiresAt: Date;
  isExpired: boolean;
  token: string;
  isUsed: boolean;

  constructor(params: PasswordResetToken) {
    this._id = params._id;
    this.account = params.account;
    this.expiresAt = params.expiresAt;
    this.isExpired = params.isExpired;
    this.token = params.token;
    this.isUsed = params.isUsed;
  }
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
