import { Account } from '../types';
import AccountDB from './account-db';

export default class AccountUtil {
  public static convertAccountDBToAccount(accountDb: AccountDB): Account {
    const account = new Account();
    account.id = accountDb._id.toString();
    account.username = accountDb.username;
    return account;
  }
}
