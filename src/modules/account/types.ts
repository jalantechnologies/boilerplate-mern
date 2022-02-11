// eslint-disable-next-line max-classes-per-file
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
}

export class AccountWithUserNameExistsError extends Error {
  code: AccountErrorCode;

  statusCode: number;

  constructor(username: string) {
    super(`An account with username ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
    this.statusCode = 409;
  }
}

export class AccountNotFoundError extends Error {
  code: AccountErrorCode;

  statusCode: number;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.statusCode = 404;
  }
}

export class InvalidCredentialsError extends Error {
  code: AccountErrorCode;

  statusCode: number;

  constructor(username: string) {
    super(`Invalid credentials for ${username}. Please try again.`);
    this.code = AccountErrorCode.NOT_FOUND;
    this.statusCode = 401;
  }
}
