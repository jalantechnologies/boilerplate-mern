import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Account {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  hashedPassword: string;
}

export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type AccountSearchParams = {
  password: string;
  username: string;
};

export type GetAccountParams = {
  accountId: string;
};

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

export type ResetPasswordParams = {
  accountId: string;
  newPassword: string;
  token: string;
};

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
  BAD_REQUEST = 'ACCOUNT_ERR_04',
}

export enum PasswordResetTokenErrorCode {
  PASSWORD_RESET_TOKEN_NOT_FOUND = 'PASSWORD_RESET_TOKEN_ERR_01',
  PASSWORD_RESET_EMAIL_NOT_ENABLED_FOR_THE_ENVIRONMENT = 'PASSWORD_RESET_TOKEN_ERR_02',
}

export class AccountWithUserNameExistsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class AccountNotFoundError extends ApplicationError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.INVALID_CREDENTIALS;
    this.httpStatusCode = HttpStatusCodes.UNAUTHORIZED;
  }
}

export class AccountBadRequestError extends ApplicationError {
  code: AccountErrorCode;

  constructor(msg: string) {
    super(msg);
    this.code = AccountErrorCode.BAD_REQUEST;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}

export class PasswordResetTokenEmailNotEnabledForTheEnvironmentError extends ApplicationError {
  code: PasswordResetTokenErrorCode;

  constructor() {
    super('Password reset token is not enabled for the environment.');
    this.code = PasswordResetTokenErrorCode.PASSWORD_RESET_EMAIL_NOT_ENABLED_FOR_THE_ENVIRONMENT;
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
