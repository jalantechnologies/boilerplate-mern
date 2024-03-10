import crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import moment, { Moment } from 'moment';

import { Account, PasswordResetToken } from '../types';

import { AccountDB } from './store/account-db';
import { PasswordResetTokenDB } from './store/password-reset-token-db';

export default class AccountUtil {
  public static convertAccountDBToAccount(accountDb: AccountDB): Account {
    const account = new Account();
    account.id = accountDb._id.toString();
    account.firstName = accountDb.firstName;
    account.lastName = accountDb.lastName;
    account.username = accountDb.username;
    account.hashedPassword = accountDb.hashedPassword;
    return account;
  }

  public static convertPasswordResetTokenDBToPasswordResetToken(
    passwordResetTokenDb: PasswordResetTokenDB,
  ): PasswordResetToken {
    const passwordResetToken = new PasswordResetToken();
    passwordResetToken.id = passwordResetTokenDb._id.toString();
    passwordResetToken.account = passwordResetTokenDb.account.toString();
    passwordResetToken.expiresAt = passwordResetTokenDb.expiresAt;
    passwordResetToken.token = passwordResetTokenDb.token;
    passwordResetToken.isUsed = passwordResetTokenDb.isUsed;
    passwordResetToken.isExpired = !moment(passwordResetTokenDb.expiresAt).isAfter(moment());
    return passwordResetToken;
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePasswordOrResetToken(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  public static async hashPasswordResetToken(resetToken: string): Promise<string> {
    return bcrypt.hash(resetToken, 10);
  }

  public static getTokenExpiresAt(defaultExpiresIn: string): Moment {
    return moment().add(parseInt(defaultExpiresIn, 10), 'seconds');
  }
}
