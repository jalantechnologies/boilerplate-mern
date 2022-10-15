import {
  Account,
  AccountNotFoundError,
  AccountSearchParams,
  AccountWithUserNameExistsError,
  InvalidCredentialsError,
} from '../types';

import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountReader {
  public static async getAccountByUsername(username: string): Promise<Account> {
    const dbAccount = await AccountRepository.accountDB.findOne({
      username,
      active: true,
    });

    if (!dbAccount) {
      throw new AccountNotFoundError(username);
    }
    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    const account = await AccountReader.getAccountByUsername(params.username);
    const isPasswordValid = await AccountUtil.comparePassword(
      params.password,
      account.hashedPassword,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError(params.username);
    } else {
      return account;
    }
  }

  public static async checkUsernameNotExists(
    params: AccountSearchParams,
  ): Promise<void> {
    const dbAccount = await AccountRepository.accountDB.findOne({
      username: params.username,
      active: true,
    });
    if (dbAccount) {
      throw new AccountWithUserNameExistsError(params.username);
    }
  }
}
