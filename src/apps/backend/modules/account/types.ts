import { ApplicationError, HttpStatusCodes } from 'backend/modules/application';

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

export type CreateAccountParamsByPhoneNumber = {
  phoneNumber: PhoneNumber;
};

export type CreateAccountParamsByUsernameAndPassword = {
  firstName: string;
  lastName: string;
  password: string;
  username: string;
};

export type CreateAccountParams =
  | CreateAccountParamsByUsernameAndPassword
  | CreateAccountParamsByPhoneNumber;

export type AccountSearchByUsernameAndPasswordParams = {
  password: string;
  username: string;
};

export type AccountSearchByPhoneNumberParams = {
  phoneNumber: PhoneNumber;
};

export type AccountSearchParams =
  | AccountSearchByUsernameAndPasswordParams
  | AccountSearchByPhoneNumberParams;

export type GetAccountParams = {
  accountId: string;
};

export type ResetPasswordParams = {
  accountId: string;
  newPassword: string;
  token: string;
};

export type UpdateAccountDetailsParams = {
  accountId: string;
  firstName: string;
  lastName: string;
};

export type UpdateAccountParams =
  | UpdateAccountDetailsParams
  | ResetPasswordParams;

export type DeleteAccountParams = GetAccountParams;

export enum AccountErrorCode {
  USERNAME_ALREADY_EXISTS = 'ACCOUNT_ERR_01',
  NOT_FOUND = 'ACCOUNT_ERR_02',
  INVALID_CREDENTIALS = 'ACCOUNT_ERR_03',
  PHONE_NUMBER_ALREADY_EXISTS = 'ACCOUNT_ERR_04',
  BAD_REQUEST = 'ACCOUNT_ERR_05',
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
    this.code = AccountErrorCode.PHONE_NUMBER_ALREADY_EXISTS;
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

  constructor(accountId: string) {
    super(
      `System is unable to find an account with id: ${accountId}. Please check it and specify a valid ID to continue.`
    );
    this.code = AccountErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class InvalidCredentialsError extends ApplicationError {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.INVALID_CREDENTIALS;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
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
