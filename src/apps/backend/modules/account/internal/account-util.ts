import * as bcrypt from 'bcrypt';

import { Account } from '../types';

import { AccountDB } from './store/account-db';

export default class AccountUtil {
  public static convertAccountDBToAccount(accountDb: AccountDB): Account {
    return new Account({
      _id: accountDb._id.toString(),
      firstName: accountDb.firstName,
      hashedPassword: accountDb.hashedPassword,
      lastName: accountDb.lastName,
      phoneNumber: accountDb.phoneNumber,
      username: accountDb.username,
    });
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
