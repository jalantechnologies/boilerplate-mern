import crypto from 'crypto';

import * as bcrypt from 'bcrypt';
import moment, { Moment } from 'moment';

import { PasswordResetToken } from "../types";
import { PasswordResetTokenDB } from "./store/password-reset-token-db";

export default class PasswordResetTokenUtil {
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

  public static async comparePasswordResetToken(
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
