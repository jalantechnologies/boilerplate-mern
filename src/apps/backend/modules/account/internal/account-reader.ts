import {
  Account,
  AccountNotFoundError,
  AccountWithPhoneNumberExistsError,
  AccountWithUserNameExistsError,
  InvalidCredentialsError,
  Nullable,
  PhoneNumber,
} from '../types';

import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountReader {
  public static async getAccountByUsername(username: string): Promise<Account> {
    const accountDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (!accountDb) {
      throw new AccountNotFoundError(username);
    }
    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async getAccountByUsernameAndPassword(
    password: string,
    username: string,
  ): Promise<Account> {
    const account = await AccountReader.getAccountByUsername(username);
    const isPasswordValid = await AccountUtil.comparePassword(
      password,
      account.hashedPassword,
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError(username);
    }

    return account;
  }

  public static async getAccountById(accountId: string): Promise<Account> {
    const accountDb = await AccountRepository.findOne({
      _id: accountId,
      active: true,
    });

    if (!accountDb) {
      throw new AccountNotFoundError(accountId);
    }
    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async getAccountByPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<Account> {
    const account = await this.getAccountByPhoneNumberOptional(phoneNumber);

    if (!account) {
      throw new AccountNotFoundError(phoneNumber.toString());
    }

    return account;
  }

  public static async getAccountByPhoneNumberOptional(
    phoneNumber: PhoneNumber,
  ): Promise<Nullable<Account>> {
    const accountDb = await AccountRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      active: true,
    });

    if (!accountDb) {
      return null;
    }

    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async checkUsernameNotExists(
    username: string,
  ): Promise<boolean> {
    const accountDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (accountDb) {
      throw new AccountWithUserNameExistsError(username);
    }

    return false;
  }

  public static async checkPhoneNumberNotExists(
    phoneNumber: PhoneNumber,
  ): Promise<boolean> {
    const accountDb = await AccountRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      active: true,
    });

    if (accountDb) {
      throw new AccountWithPhoneNumberExistsError(phoneNumber.toString());
    }

    return false;
  }

  public static async getAccounts(
    page: number,
    size: number,
    search?: string,
  ): Promise<Account[]> {
    const query: any = { active: true };
    if (search) {
      query.$or = [
        { firstName: new RegExp(search, 'i') },
        { lastName: new RegExp(search, 'i') },
        { username: new RegExp(search, 'i') },
      ];
    }
    const accounts = await AccountRepository.find(query)
      .skip((page - 1) * size)
      .limit(size);

    return accounts.map((accountDb) =>
      AccountUtil.convertAccountDBToAccount(accountDb),
    );
  }
}
