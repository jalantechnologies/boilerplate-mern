import crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import moment, { Moment } from 'moment';

import { AccountService } from '../../account';
import { Document } from '../../application/application-repository';
import { ConfigService } from '../../config';
import { PasswordResetToken } from '../types';

export default class PasswordResetTokenUtil {
  public static async convertPasswordResetTokenDBToPasswordResetToken(
    passwordResetTokenDb: Document<PasswordResetToken>,
  ): Promise<PasswordResetToken> {
    return new PasswordResetToken({
      id: passwordResetTokenDb._id.toString(),
      account: await AccountService.getAccountById({
        accountId: passwordResetTokenDb.accountId.toString(),
      }),
      expiresAt: passwordResetTokenDb.expiresAt,
      isExpired: !moment(passwordResetTokenDb.expiresAt).isAfter(moment()),
      isUsed: passwordResetTokenDb.isUsed,
      token: passwordResetTokenDb.token,
    });
  }

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async comparePasswordResetToken(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  public static generatePasswordResetToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  public static async hashPasswordResetToken(
    resetToken: string,
  ): Promise<string> {
    return bcrypt.hash(resetToken, 10);
  }

  public static getTokenExpiresAt(): Moment {
    const defaultTokenExpireTimeInSeconds = ConfigService.getValue<string>(
      'passwordResetToken.expiresInSeconds',
    );

    return moment().add(
      parseInt(defaultTokenExpireTimeInSeconds, 10),
      'seconds',
    );
  }
}
