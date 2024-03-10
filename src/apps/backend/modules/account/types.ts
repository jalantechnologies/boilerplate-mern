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

  used: boolean;
}

export type CreatePasswordResetTokenParams = {
  username: string;
};

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
  PASSWORD_RESET_TOKEN_NOT_ENABLED_FOR_THE_ENVIRONMENT = 'ACCOUNT_ERR_04',
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

export class PasswordResetTokenEmailNotEnabledForTheEnvironmentError extends ApplicationError {
  code: AccountErrorCode;

  constructor() {
    super('Password reset token is not enabled for the environment.');
    this.code = AccountErrorCode.PASSWORD_RESET_TOKEN_NOT_ENABLED_FOR_THE_ENVIRONMENT;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}
