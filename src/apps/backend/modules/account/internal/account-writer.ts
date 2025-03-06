import { OtpRequestError } from '../../otp/types';
import { Account, PhoneNumber } from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccountByUsernameAndPassword(
    firstName: string,
    lastName: string,
    password: string,
    username: string
  ): Promise<Account> {
    // check if account already exists
    // this will throw an error if it does
    await AccountReader.checkUsernameNotExists(username);

    const accountHashedPassword = await AccountUtil.hashPassword(password);
    const accountDb = await AccountRepository.create({
      firstName,
      lastName,
      username,
      hashedPassword: accountHashedPassword,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async createAccountByPhoneNumber(
    phoneNumber: PhoneNumber
  ): Promise<Account> {
    AccountUtil.validatePhoneNumber(phoneNumber);
    const account = await AccountReader.getAccountByPhoneNumber(phoneNumber);
    if (account) {
      throw new OtpRequestError('Phone number already exists');
    }
    const accountDb = await AccountRepository.create({
      phoneNumber,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async createAccountByPhoneNumberAndName(
    phoneNumber: PhoneNumber,
    firstName?: string,
    lastName?: string
  ): Promise<Account> {
    const accountDb = await AccountRepository.create({
      firstName,
      lastName,
      phoneNumber,
      active: true,
    });
    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async updatePasswordByAccountId(
    accountId: string,
    newPassword: string
  ): Promise<Account> {
    const accountHashedPassword = await AccountUtil.hashPassword(newPassword);
    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        hashedPassword: accountHashedPassword,
      },
      { new: true }
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async updateAccountDetails(
    accountId: string,
    firstName: string,
    lastName: string
  ): Promise<Account> {
    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        firstName,
        lastName,
      },
      { new: true }
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async deleteAccountById(accountId: string): Promise<void> {
    await AccountRepository.findByIdAndDelete(accountId);
  }
}
