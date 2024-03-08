import {
  Account,
  AccountNotFoundError,
  AccountWithContactNumberExistsError,
  AccountWithUserNameExistsError,
  ContactNumber,
  InvalidCredentialsError,
} from '../types';

import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountReader {
  public static async getAccountByUsername(
    username: string,
  ): Promise<Account> {
    const accDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (!accDb) {
      throw new AccountNotFoundError(username);
    }
    return AccountUtil.convertAccountDBToAccount(accDb);
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

  public static async getAccountById(
    accountId: string,
  ): Promise<Account> {
    const accDb = await AccountRepository.findOne({
      _id: accountId,
      active: true,
    });

    if (!accDb) {
      throw new AccountNotFoundError(accountId);
    }
    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async getAccountByContactNumber(
    contactNumber: ContactNumber,
  ): Promise<Account> {
    const accDb = await AccountRepository.findOne({
      'contactNumber.countryCode': contactNumber.countryCode,
      'contactNumber.phoneNumber': contactNumber.phoneNumber,
      active: true,
    });

    if (!accDb) {
      return null;
    }

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async checkUsernameNotExists(
    username: string,
  ): Promise<boolean> {
    const accDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (accDb) {
      throw new AccountWithUserNameExistsError(username);
    }

    return false;
  }

  public static async checkContactNumberNotExists(
    contactNumber: ContactNumber,
  ): Promise<boolean> {
    const { countryCode, phoneNumber } = contactNumber;

    const accDb = await AccountRepository.findOne({
      'contactNumber.countryCode': countryCode,
      'contactNumber.phoneNumber': phoneNumber,
      active: true,
    });

    if (accDb) {
      throw new AccountWithContactNumberExistsError(`${countryCode} ${phoneNumber}`);
    }

    return false;
  }
}
