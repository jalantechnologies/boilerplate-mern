import { Account, CreateAccountParams } from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    // check if account already exists
    // this will throw an error if it does
    await AccountReader.checkUsernameNotExists(params);

    const accHashedPwd = await AccountUtil.hashPassword(params.password);
    const accDb = await AccountRepository.create({
      firstName: params.firstName,
      lastName: params.lastName,
      username: params.username,
      hashedPassword: accHashedPwd,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async createAccountWithContactNumber(
    params: CreateAccountParams,
  ): Promise<Account> {
    // check if account already exists with the given contact number
    // this will throw an error if it does
    await AccountReader.checkContactNumberNotExists(params);

    const accDb = await AccountRepository.create({
      contactNumber: params.contactNumber,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }
}
