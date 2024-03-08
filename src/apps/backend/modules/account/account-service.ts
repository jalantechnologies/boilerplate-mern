import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  AccountNotFoundError,
  AccountSearchParams,
  CreateAccountParams,
  GetAccountParams,
  CreatePasswordResetTokenParams,
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
    params: CreatePasswordResetTokenParams,
  ): Promise<void> {
    let account: Account;
    try {
      account = await AccountReader.getAccountByUsername(params.username);
    } catch (e) {
      if (e instanceof AccountNotFoundError) {
        throw new AccountNotFoundError(params.username);
      }
      throw e;
    }

    const passwordResetToken = await AccountWriter.createPasswordResetToken(account.id);

    await this.sendPasswordResetEmail(
      params.username,
      passwordResetToken.token,
    );
  }

  private static async sendPasswordResetEmail(
    username: string,
    token: string,
  ): Promise<void> {
    // Send email
    console.log('Sending email to', username);
    console.log('Password reset token:', token);
  }
}
