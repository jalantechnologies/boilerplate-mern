import {
  Account,
  AccountNotFoundError,
  AccountWithUserNameExistsError,
  InvalidCredentialsError,
  Nullable,
  PhoneNumber,
} from 'backend/modules/account';
import AccountUtil from 'backend/modules/account/internal/account-util';
import AccountRepository from 'backend/modules/account/internal/store/account-repository';

export default class AccountReader {
  public static async getAccountByUsername(username: string): Promise<Account> {
    const accountDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (!accountDb) {
      throw new AccountNotFoundError(username);
    }
    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async getAccountByUsernameAndPassword(
    password: string,
    username: string
  ): Promise<Account> {
    const account = await AccountReader.getAccountByUsername(username);
    const isPasswordValid = await AccountUtil.comparePassword(
      password,
      account.hashedPassword
    );
    if (!isPasswordValid) {
      throw new InvalidCredentialsError(username);
    }

    return account;
  }

  public static async getAccountById(accountId: string): Promise<Account> {
    const accountDb = await AccountRepository.findOne({
      _id: accountId,
      active: true,
    });

    if (!accountDb) {
      throw new AccountNotFoundError(accountId);
    }
    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async getAccountByPhoneNumber(
    phoneNumber: PhoneNumber
  ): Promise<Nullable<Account>> {
    const accountDb = await AccountRepository.findOne({
      'phoneNumber.countryCode': phoneNumber.countryCode,
      'phoneNumber.phoneNumber': phoneNumber.phoneNumber,
      active: true,
    });

    if (!accountDb) {
      return null;
    }

    return AccountUtil.convertAccountDBToAccount(accountDb);
  }

  public static async checkUsernameNotExists(
    username: string
  ): Promise<boolean> {
    const accountDb = await AccountRepository.findOne({
      username,
      active: true,
    });

    if (accountDb) {
      throw new AccountWithUserNameExistsError(username);
    }

    return false;
  }
}
