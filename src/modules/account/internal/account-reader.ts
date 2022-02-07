import {
  Account, AccountSearchParams, GetAllTaskParams, Task,
} from '../types';

export default class AccountReader {
  public static async getAccountByUsername(username: string): Promise<Account> {
    // TODO: Implement this
    // It searches for account by username with active as TRUE.
    // If found, then it converts account db to account using
    // AccountUtil.convertAccountDBToAccount
    // If account is not found, it throws AccountNotFoundError
  }

  public static async getAccountByUsernamePassword(params: AccountSearchParams): Promise<Account> {
    // TODO: Implement this
    // It searches for account by username and hashed password with active as TRUE.
    // If found, then it converts account db to account using
    // AccountUtil.convertAccountDBToAccount
    // If account is not found, it throws AccountNotFoundError
  }
}
