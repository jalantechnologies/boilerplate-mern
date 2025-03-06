import {
  Account,
  ResetPasswordParams,
  GetAccountParams,
  PhoneNumber,
  UpdateAccountDetailsParams,
  DeleteAccountParams,
} from 'backend/modules/account';
import AccountReader from 'backend/modules/account/internal/account-reader';
import AccountWriter from 'backend/modules/account/internal/account-writer';
import { AuthenticationService } from 'backend/modules/authentication';

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
    let account = await AccountReader.getAccountByPhoneNumber(phoneNumber);

    if (!account) {
      account = await AccountWriter.createAccountByPhoneNumber(phoneNumber);
    }

    await AuthenticationService.createOTP(phoneNumber);

    return account;
  }

  public static async createAccountByPhoneNumberAndName(
    phoneNumber: PhoneNumber,
    firstName?: string,
    lastName?: string
  ): Promise<Account> {
    if (!firstName && !lastName) {
      throw new OtpRequestError('Please provide first name or last name');
    }
    AccountUtil.validatePhoneNumber(phoneNumber);
    const account = await AccountReader.getAccountByPhoneNumber(phoneNumber);
    if (account) {
      throw new OtpRequestError('Phone number already exists');
    }
    const accountNew = await AccountWriter.createAccountByPhoneNumberAndName(
      phoneNumber,
      firstName,
      lastName
    );
    await OtpService.createOtp(phoneNumber);
    return accountNew;
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
      await AuthenticationService.verifyPasswordResetToken(accountId, token);

    const updatedAccount = await AccountWriter.updatePasswordByAccountId(
      accountId,
      newPassword
    );

    await AuthenticationService.setPasswordResetTokenAsUsedById(
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
