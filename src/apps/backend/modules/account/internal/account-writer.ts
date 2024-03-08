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

    const accHashedPwd = await AccountUtil.hashPassword(password);
    const accDb = await AccountRepository.create({
      firstName,
      lastName,
      username,
      hashedPassword: accHashedPwd,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async createAccountByPhoneNumber(
    phoneNumber: PhoneNumber,
  ): Promise<Account> {
    // check if account already exists with the given phone number
    // this will throw an error if it does
    await AccountReader.checkPhoneNumberNotExists(phoneNumber);

    const accDb = await AccountRepository.create({
      phoneNumber,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }
}
