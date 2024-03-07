import { SMSService } from '../communication';
import {
  VerifyOtpResponse,
  VerifyOtpResponseStatus,
} from '../communication/types';
import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  AccountSearchParams,
  CreateAccountParams,
  GetAccountParams,
  VerifyOTPError,
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

  public static async getAccountByContactNumber(
    params: AccountSearchParams,
  ): Promise<Account> {
    return AccountReader.getAccountByContactNumber(params.contactNumber);
  }

  public static async createAccountWithContactNumber(
    params: CreateAccountParams,
  ): Promise<Account> {
    return AccountWriter.createAccountWithContactNumber(params);
  }

  public static async sendOTP(contactNumber: string): Promise<Account> {
    await SMSService.sendOTP(contactNumber);

    const params: CreateAccountParams = {
      contactNumber,
      password: null,
      username: null,
    };

    const account = await AccountReader.getAccountByContactNumber(params.contactNumber);

    if (account) {
      return account;
    }

    return AccountService.createAccountWithContactNumber(params);
  }

  public static async verifyOTP(
    accountId: string,
    otp: string,
  ): Promise<Account> {
    const account = await AccountReader.getAccountById(accountId);

    const verifyOtpResponse: VerifyOtpResponse = await SMSService
      .verifyOTP(account.contactNumber, otp);

    if (verifyOtpResponse.status === VerifyOtpResponseStatus.FAILURE) {
      throw new VerifyOTPError(verifyOtpResponse.responseMessage);
    }

    return account;
  }
}
