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
