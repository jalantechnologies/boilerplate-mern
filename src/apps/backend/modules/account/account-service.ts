import { OtpService } from '../otp';

import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  GetAccountParams,
  PhoneNumber,
} from './types';

export default class AccountService {
  public static async createAccountByUsernameAndPassword(
    firstName: string,
    lastName: string,
    password: string,
    username: string,
  ): Promise<Account> {
    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password,
      username,
    );
  }

  public static async createAccountByPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<Account> {
    let account = await AccountReader.getAccountByPhoneNumberOptional(phoneNumber);

    if (!account) {
      account = await AccountWriter.createAccountByPhoneNumber(phoneNumber);
    }

    await OtpService.createOtp(phoneNumber);

    return account;
  }

  public static async getAccountByUsernameAndPassword(
    password: string,
    username: string,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernameAndPassword(password, username);
  }

  public static async getAccountByPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<Account> {
    return AccountReader.getAccountByPhoneNumber(phoneNumber);
  }

  public static async getAccountById(
    params: GetAccountParams,
  ): Promise<Account> {
    return AccountReader.getAccountById(params.accountId);
  }
}
