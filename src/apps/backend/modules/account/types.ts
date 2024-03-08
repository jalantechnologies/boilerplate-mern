import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export type Nullable<T> = T | null;

export class PhoneNumber {
  countryCode: string;
  phoneNumber: string;

  constructor(countryCode: string, phoneNumber: string) {
    this.countryCode = countryCode;
    this.phoneNumber = phoneNumber;
  }

  toString(): string {
    return `${this.countryCode} ${this.phoneNumber}`;
  }
}

export class Account {
  firstName: string;
  hashedPassword: string;
  id: string;
  lastName: string;
  phoneNumber: PhoneNumber;
  username: string;
}

export type CreateAccountParams = {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber?: PhoneNumber;
  username: string;
};

export type AccountSearchParams = {
  password?: string;
  phoneNumber?: PhoneNumber;
  username?: string;
};

export type GetAccountParams = {
  accountId: string;
};

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
  CONTACT_NUMBER_ALREADY_EXISTS = 'ACCOUNT_ERR_04',
}

export class AccountWithUserNameExistsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class AccountWithPhoneNumberExistsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(phoneNumber: string) {
    super(`An account with phone number ${phoneNumber} already exists.`);
    this.code = AccountErrorCode.CONTACT_NUMBER_ALREADY_EXISTS;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class AccountWithPhoneNumberNotFoundError extends ApplicationError {
  code: AccountErrorCode;

  constructor(phoneNumber: string) {
    super(`Account with phone number ${phoneNumber} not found.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
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
