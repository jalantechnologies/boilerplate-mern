import {
  Account,
  AccountNotFoundError,
  AccountSearchParams,
  InvalidCredentialsError,
} from '../types';
import AccountDB from './account-db';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountReader {
  public static async getAccountByUsername(username: string): Promise<Account> {
    const dbAccount: AccountDB = await AccountRepository.findOne({
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
    const dbAccount = await AccountRepository.findOne({
      username: params.username,
      active: true,
    });
    if (!dbAccount) {
      throw new AccountNotFoundError(params.username);
    }
    const account = AccountUtil.convertAccountDBToAccount(dbAccount);
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
}
