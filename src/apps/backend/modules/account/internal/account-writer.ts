import { ConfigService } from '../../config';
import { Account, CreateAccountParams, PasswordResetToken } from '../types';

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
}
