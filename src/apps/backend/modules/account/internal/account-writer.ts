/* eslint-disable no-useless-catch */
import { Account, CreateAccountParams } from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    await AccountReader.checkUsernameNotExists(params);
    const hashedPassword = await AccountUtil.hashPassword(params.password);
    const dbAccount = await AccountRepository.accountDB.create({
      username: params.username,
      hashedPassword,
      active: true,
    });
    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }
}
