/* eslint-disable max-classes-per-file */
import AppError from '../app-error/app-error';

export class Account {
  id: string;

  username: string;

  hashedPassword: string;
}

export type CreateAccountParams = {
  username: string;
  password: string;
};

export type AccountSearchParams = {
  username: string;
  password: string;
};

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
  VALIDATION_ERROR = 'ACCOUNT_ERR_04',
}

export class AccountWithUserNameExistsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class AccountNotFoundError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}

export class InvalidCredentialsError extends AppError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = 401;
  }
}

export type ValidationFailure = {
  field: string;
  message: string;
};

export class ValidationError extends AppError {
  code: AccountErrorCode;

  failures: ValidationFailure[];

  constructor(msg: string, failures: ValidationFailure[] = []) {
    super(msg);
    this.code = AccountErrorCode.VALIDATION_ERROR;
    this.failures = failures;
    this.httpStatusCode = 400;
  }
}
