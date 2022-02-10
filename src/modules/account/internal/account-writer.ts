import {
  Account,
  AccountWithUserNameExistsError,
  CreateAccountParams,
} from '../types';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    const AccountDB = AccountRepository.accountDb;
    const existingAccount = await AccountDB.findOne({
      username: params.username,
    }).exec();
    if (existingAccount) {
      throw new AccountWithUserNameExistsError(params.username);
    }
    const hashedPassword = await AccountUtil.hashPassword(params.password);
    const dbAccount = await AccountDB.create({
      username: params.username,
      hashedPassword,
      active: true,
    });
    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }
}
