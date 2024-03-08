import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export type ContactNumber = {
  countryCode: string;
  phoneNumber: string;
};

export class Account {
  id: string;
  contactNumber: ContactNumber;
  firstName: string;
  lastName: string;
  username: string;
  hashedPassword: string;
}

export type CreateAccountParams = {
  contactNumber?: ContactNumber;
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type AccountSearchParams = {
  contactNumber?: ContactNumber;
  password?: string;
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

export class AccountWithContactNumberExistsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(contactNumber: string) {
    super(`An account with contact number ${contactNumber} already exists.`);
    this.code = AccountErrorCode.CONTACT_NUMBER_ALREADY_EXISTS;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class AccountWithContactNumberNotFoundError extends ApplicationError {
  code: AccountErrorCode;

  constructor(contactNumber: string) {
    super(`Account with contact number ${contactNumber} not found.`);
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
