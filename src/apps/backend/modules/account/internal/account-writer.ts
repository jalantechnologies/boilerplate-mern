import { ConfigService } from '../../config';
import {
  Account, AccountBadRequestError, CreateAccountParams, PasswordResetToken,
} from '../types';

import AccountReader from './account-reader';
import AccountUtil from './account-util';
import AccountRepository from './store/account-repository';
import PasswordResetTokenRepository from './store/password-reset-token-repository';

export default class AccountWriter {
  public static async createAccount(
    params: CreateAccountParams,
  ): Promise<Account> {
    // check if account already exists
    // this will throw an error if it does
    await AccountReader.checkUsernameNotExists(params);

    const accHashedPwd = await AccountUtil.hashPassword(params.password);
    const accDb = await AccountRepository.create({
      firstName: params.firstName,
      lastName: params.lastName,
      username: params.username,
      hashedPassword: accHashedPwd,
      active: true,
    });

    return AccountUtil.convertAccountDBToAccount(accDb);
  }

  public static async createPasswordResetToken(
    accountId: string,
    token: string,
  ): Promise<PasswordResetToken> {
    const defaultTokenExpireTimeInSeconds = ConfigService.getValue<string>(
      'passwordResetToken.expiresInSeconds',
    );
    const tokenHash = await AccountUtil.hashPasswordResetToken(token);

    const passwordResetTokenDB = await PasswordResetTokenRepository.create({
      account: accountId,
      expiresAt: AccountUtil.getTokenExpiresAt(defaultTokenExpireTimeInSeconds),
      token: tokenHash,
    });

    return AccountUtil.convertPasswordResetTokenDBToPasswordResetToken(
      passwordResetTokenDB,
    );
  }

  public static async resetPassword(
    accountId: string,
    newPassword: string,
    token: string,
  ): Promise<Account> {
    const passwordResetToken = await AccountReader.getPasswordResetTokenByAccountId(accountId);

    if (passwordResetToken.isExpired) {
      throw new AccountBadRequestError(
        `Password reset link is expired for accountId ${accountId}. Please retry with new link`,
      );
    }

    if (passwordResetToken.isUsed) {
      throw new AccountBadRequestError(
        `Password reset is already used for accountId ${accountId}. Please retry with new link`,
      );
    }

    const isTokenValid = await AccountUtil.comparePasswordOrResetToken(
      token,
      passwordResetToken.token,
    );
    if (!isTokenValid) {
      throw new AccountBadRequestError(
        `Password reset link is invalid for accountId ${accountId}. Please retry with new link.`,
      );
    }

    const hashedPassword = await AccountUtil.hashPassword(newPassword);

    const dbAccount = await AccountRepository.findByIdAndUpdate(
      accountId,
      {
        hashedPassword,
      },
    );

    await AccountWriter.setPasswordResetTokenAsUsed(
      passwordResetToken.id,
    );

    return AccountUtil.convertAccountDBToAccount(dbAccount);
  }

  private static async setPasswordResetTokenAsUsed(
    passwordResetTokenId: string,
  ): Promise<PasswordResetToken> {
    return PasswordResetTokenRepository.findByIdAndUpdate(
      passwordResetTokenId,
      {
        used: true,
      },
    );
  }
}
