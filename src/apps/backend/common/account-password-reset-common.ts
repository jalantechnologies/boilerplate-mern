import AccountReader from '../modules/account/internal/account-reader';
import { Account } from '../modules/account/types';

export default class AccountPasswordResetCommon {
  public static async getAccountByUsername(username: string): Promise<Account> {
    return AccountReader.getAccountByUsername(username);
  }
}
