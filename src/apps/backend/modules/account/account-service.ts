import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account, AccountSearchParams, CreateAccountParams, GetAccountParams, PasswordResetEmailParams,
} from './types';

export default class AccountService {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    return AccountWriter.createAccount(params);
  }

  public static async getAccountByUsernamePassword(
    params: AccountSearchParams,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernamePassword(params);
  }

  public static async getAccountById(
    params: GetAccountParams,
  ): Promise<Account> {
    return AccountReader.getAccountById(params.accountId);
  }

  public static async createPasswordResetToken(
    params: PasswordResetEmailParams,
  ): Promise<void> {
    const account = await AccountReader.getAccountByUsername(params.username);
    console.log('Sending password reset email to:', account);
  }
}
