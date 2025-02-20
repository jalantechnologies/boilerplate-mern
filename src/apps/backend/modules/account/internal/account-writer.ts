import { PhoneNumberUtil } from 'google-libphonenumber';

import {
  PhoneUtilInstance,
  PhoneUtilInterface,
} from '../../communication/types';
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
    username: string,
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
    phoneNumber: PhoneNumber,
  ): Promise<Account> {
    const phoneUtil = <PhoneUtilInterface>(
      (<PhoneUtilInstance>PhoneNumberUtil).getInstance()
    );
    const isValidPhoneNumber = phoneUtil.isValidNumber(
      phoneUtil.parse(phoneNumber.toString()),
    );

    if (!isValidPhoneNumber) {
      throw new OtpRequestError('Please provide a valid phone number.');
    }
    // check if account already exists with the given phone number
    // this will throw an error if it does
    await AccountReader.checkPhoneNumberNotExists(phoneNumber);

    const accountDb = await AccountRepository.create({
      phoneNumber,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async updatePasswordByAccountId(
    accountId: string,
    newPassword: string,
  ): Promise<Account> {
    const accountHashedPassword = await AccountUtil.hashPassword(newPassword);
    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        hashedPassword: accountHashedPassword,
      },
      { new: true },
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async updateAccountDetails(
    accountId: string,
    firstName: string,
    lastName: string,
  ): Promise<Account> {
    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        firstName,
        lastName,
      },
      { new: true },
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  public static async deleteAccountById(accountId: string): Promise<void> {
    await AccountRepository.findByIdAndDelete(accountId);
  }
}
