import {
  Account,
  AccountNotFoundError,
  AccountSearchParams,
  AccountWithUserNameExistsError,
  InvalidCredentialsError,
  PasswordResetToken,
  PasswordResetTokenNotFoundError,
} from '../types';

import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';
import PasswordResetTokenRepository from './store/password-reset-token-repository';

export default class AccountReader {
  public static async getAccountByUsername(
    username: string,
  ): Promise<Account> {
    const accDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (!accDb) {
      throw new AccountNotFoundError(username);
    }
    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    const account = await AccountReader.getAccountByUsername(params.username);
    const isPasswordValid = await AccountUtil.comparePasswordOrResetToken(
      params.password,
      account.hashedPassword,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError(params.username);
    }

    return account;
  }

  public static async getAccountById(
    accountId: string,
  ): Promise<Account> {
    const accDb = await AccountRepository.findOne({
      _id: accountId,
      active: true,
    });

    if (!accDb) {
      throw new AccountNotFoundError(accountId);
    }
    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async checkUsernameNotExists(
    params: AccountSearchParams,
  ): Promise<boolean> {
    const accDb = await AccountRepository.findOne({
      username: params.username,
      active: true,
    });
    if (accDb) {
      throw new AccountWithUserNameExistsError(params.username);
    }

    return false;
  }

  public static async getPasswordResetTokenByAccountId(
    accountId: string,
  ): Promise<PasswordResetToken> {
    const tokenDB = await PasswordResetTokenRepository.findOne({
      account: accountId,
    }).sort({ createdAt: -1 }); // to get the latest token

    if (!tokenDB) {
      throw new PasswordResetTokenNotFoundError(accountId);
    }

    return AccountUtil.convertPasswordResetTokenDBToPasswordResetToken(tokenDB);
  }
}
