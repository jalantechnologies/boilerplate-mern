import { PasswordResetTokenService } from '../password-reset-token';

import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  AccountSearchParams,
  CreateAccountParams,
  GetAccountParams,
  ResetPasswordParams,
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

  public static async getAccountByUsername(
    username: string,
  ): Promise<Account> {
    return AccountReader.getAccountByUsername(username);
  }

  public static async resetAccountPassword(
    params: ResetPasswordParams,
  ): Promise<Account> {
    const { accountId, newPassword, token } = params;

    const passwordResetToken = await PasswordResetTokenService.verifyPasswordResetToken(
      accountId,
      token,
    );

    const updatedAccount = await AccountWriter.updatePasswordByAccountId(
      accountId,
      newPassword,
    );

    await PasswordResetTokenService.setPasswordResetTokenAsUsedById(passwordResetToken.id);

    return updatedAccount;
  }
}
