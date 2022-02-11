import { Account, CreateAccountParams } from '../types';
import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    const AccountDB = AccountRepository.accountDb;
    await AccountReader.checkUsernameNotExists(params);
    const hashedPassword = await AccountUtil.hashPassword(params.password);
    const dbAccount = await AccountDB.create({
      username: params.username,
      hashedPassword,
      active: true,
    });
    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }
}
