import { Account, CreateAccountParams } from '../types';
import AccountReader from './account-reader';

export default class AccountWriter {
  public static async createAccount(params: CreateAccountParams): Promise<Account> {
    // Ensure that no account accounts with the said username
    await AccountReader.getAccountByUsername(params.username);

    // TODO: Create an account by hashing the password and convert mongoose object
    // to Account by calling AccountUtil.convertAccountDBToAccount
  }
}
