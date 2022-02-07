// eslint-disable-next-line max-classes-per-file
export class Account {
  id: string;

  username: string;
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
}

export class AccountWithUserNameExistsError extends Error {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`An account with ${username} already exists.`);
    this.code = AccountErrorCode.USERNAME_ALREADY_EXISTS;
  }
}

export class AccountNotFoundError extends Error {
  code: AccountErrorCode;

  constructor(username: string) {
    super(`${username} not found with provided parameters.`);
    this.code = AccountErrorCode.NOT_FOUND;
  }
}
