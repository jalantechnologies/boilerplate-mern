import { OtpService } from '../otp';
import { PasswordResetTokenService } from '../password-reset-token';

import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  ResetPasswordParams,
  GetAccountParams,
  PhoneNumber,
  UpdateAccountDetailsParams,
  DeleteAccountParams,
} from './types';

export default class AccountService {
  public static async createAccountByUsernameAndPassword(
    firstName: string,
    lastName: string,
    password: string,
    username: string
  ): Promise<Account> {
    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password,
      username
    );
  }

  public static async getOrCreateAccountByPhoneNumber(
    phoneNumber: PhoneNumber
  ): Promise<Account> {
    let account =
      await AccountReader.getAccountByPhoneNumberOptional(phoneNumber);

    if (!account) {
      account = await AccountWriter.createAccountByPhoneNumber(phoneNumber);
    }

    await OtpService.createOtp(phoneNumber);

    return account;
  }

  public static async getAccountByUsernameAndPassword(
    password: string,
    username: string
  ): Promise<Account> {
    return AccountReader.getAccountByUsernameAndPassword(password, username);
  }

  public static async getAccountByPhoneNumber(
    phoneNumber: PhoneNumber
  ): Promise<Account> {
    return AccountReader.getAccountByPhoneNumber(phoneNumber);
  }

  public static async getAccountById(
    params: GetAccountParams
  ): Promise<Account> {
    return AccountReader.getAccountById(params.accountId);
  }

  public static async getAccountByUsername(username: string): Promise<Account> {
    return AccountReader.getAccountByUsername(username);
  }

  public static async resetAccountPassword(
    params: ResetPasswordParams
  ): Promise<Account> {
    const { accountId, newPassword, token } = params;
    await AccountReader.getAccountById(accountId);

    const passwordResetToken =
      await PasswordResetTokenService.verifyPasswordResetToken(
        accountId,
        token
      );

    const updatedAccount = await AccountWriter.updatePasswordByAccountId(
      accountId,
      newPassword
    );

    await PasswordResetTokenService.setPasswordResetTokenAsUsedById(
      passwordResetToken.id
    );

    return updatedAccount;
  }

  public static async updateAccountDetails(
    params: UpdateAccountDetailsParams
  ): Promise<Account> {
    const { accountId, firstName, lastName } = params;
    await AccountReader.getAccountById(accountId);

    return AccountWriter.updateAccountDetails(accountId, firstName, lastName);
  }

  public static async deleteAccountById(
    params: DeleteAccountParams
  ): Promise<void> {
    const { accountId } = params;
    await AccountReader.getAccountById(accountId);

    return AccountWriter.deleteAccountById(accountId);
  }
}
