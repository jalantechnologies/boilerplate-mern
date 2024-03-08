import AccountReader from './internal/account-reader';
import AccountWriter from './internal/account-writer';
import {
  Account,
  ContactNumber,
  GetAccountParams,
} from './types';

export default class AccountService {
  public static async createAccountByUsernameAndPassword(
    firstName: string,
    lastName: string,
    password: string,
    username: string,
  ): Promise<Account> {
    return AccountWriter.createAccountByUsernameAndPassword(
      firstName,
      lastName,
      password,
      username,
    );
  }

  public static async createAccountByContactNumber(
    contactNumber: ContactNumber,
  ): Promise<Account> {
    const account = await AccountReader.getAccountByContactNumber(contactNumber);

    if (account) {
      return account;
    }

    return AccountWriter.createAccountByContactNumber(contactNumber);
  }

  public static async getAccountByUsernameAndPassword(
    password: string,
    username: string,
  ): Promise<Account> {
    return AccountReader.getAccountByUsernameAndPassword(password, username);
  }

  public static async getAccountByContactNumber(
    contactNumber: ContactNumber,
  ): Promise<Account> {
    return AccountReader.getAccountByContactNumber(contactNumber);
  }

  public static async getAccountById(
    params: GetAccountParams,
  ): Promise<Account> {
    return AccountReader.getAccountById(params.accountId);
  }
}
