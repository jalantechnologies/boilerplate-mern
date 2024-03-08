import { Account, ContactNumber } from '../types';

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
      contactNumber: null,
      firstName,
      lastName,
      username,
      hashedPassword: accHashedPwd,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async createAccountByContactNumber(
    contactNumber: ContactNumber,
  ): Promise<Account> {
    // check if account already exists with the given contact number
    // this will throw an error if it does
    await AccountReader.checkContactNumberNotExists(contactNumber);

    const accDb = await AccountRepository.create({
      contactNumber,
      firstName: null,
      lastName: null,
      username: null,
      hashedPassword: null,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }
}
